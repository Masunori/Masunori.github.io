import { Accuracy, Bar, Entity, InputType, Note } from "./types";

type ScheduledNote = Note & {
    id: number; // Unique identifier for the scheduled note
    spawned: boolean; // Whether the note has been spawned
    judged: boolean; // Whether the note has been judged (hit or missed)
}

type ScheduledBar = Bar & {
    id: number;
    spawned: boolean; // Whether the bar has been spawned
}

type ScheduledEntity = ScheduledNote | ScheduledBar;

export type SchedulerConfig = {
    spawnAheadTime: number; // Time in milliseconds to spawn notes ahead of their scheduled time
    window: {
        good: number; // Time window in milliseconds for a "good" hit
        ok: number; // Time window in milliseconds for an "ok" hit
        bad: number; // Time window in milliseconds for a "bad" hit
    }
};

export const DEFAULT_CONFIG: SchedulerConfig = {
    spawnAheadTime: 2000, // Time in milliseconds to spawn notes ahead of their scheduled time
    window: {
        good: 25,
        ok: 50,
        bad: 100
    }
};

type EntitySpawnListener = (entity: Entity) => void;
type NoteHitListener = (note: Note, accuracy: Accuracy) => void;

/**
 * A scheduler for managing the timing of notes in a rhythm game. It handles spawning notes, judging hits, and notifying listeners of note events.
 * 
 * The scheduler maintains a list of notes, each with a scheduled time. It spawns notes ahead of their scheduled time based on the configured spawnAheadTime.
 * It also judges hits based on the configured timing windows for "good", "ok", and "bad" hits.
 * 
 * Listeners can be registered to receive notifications when notes are spawned or hit (or auto-missed).
 * 
 * Parameters:
 * - `entities`: An array of notes to be scheduled.
 * - `config`: Configuration for the scheduler, including spawnAheadTime and hit windows.
 * - `offset`: An optional time offset (in milliseconds) to adjust the timing of the notes. A negative offset means the audio will be played earlier than the chart.
 */
export default class TaikoScheduler {
    private readonly entities: ScheduledEntity[];
    private readonly config: SchedulerConfig;
    private readonly offset: number;

    private nextSpawnIndex: number = 0;
    private nextHitIndex: number = 0;

    private started: boolean = false;
    private ended: boolean = false;

    private noteSpawnListeners: EntitySpawnListener[] = [];
    private noteHitListeners: NoteHitListener[] = [];

    private logListeners: ((message: string) => void)[] = [];
    
    constructor(entities: Entity[], config: SchedulerConfig = DEFAULT_CONFIG, offset: number = 0) {
        this.entities = [...entities].sort((a, b) => a.time - b.time).map((note, index) => ({ ...note, id: index, spawned: false, judged: false })); // Ensure notes are sorted by time and add scheduled properties
        this.config = config;
        this.offset = offset;
    }

    /**
     * Registers a listener for note spawn events. The listener will be called whenever a note is spawned.
     * @param listener 
     * @returns A function to unregister the listener.
     */
    public registerEntitySpawnListener(listener: EntitySpawnListener): () => void {
        this.noteSpawnListeners.push(listener);
        return () => {
            const index = this.noteSpawnListeners.indexOf(listener);
            if (index !== -1) {
                this.noteSpawnListeners.splice(index, 1);
            }
        };
    }

    /**
     * Registers a listener for note hit events. The listener will be called whenever a note is hit or auto-missed.
     * @param listener 
     * @returns A function to unregister the listener.
     */
    public registerNoteHitListener(listener: NoteHitListener): () => void {
        this.noteHitListeners.push(listener);
        return () => {
            const index = this.noteHitListeners.indexOf(listener);
            if (index !== -1) {
                this.noteHitListeners.splice(index, 1);
            }
        };
    }

    /**
     * Registers a listener for log messages. The listener will be called whenever a log message is generated.
     * @param listener 
     * @returns A function to unregister the listener.
     */
    public registerLogListener(listener: (message: string) => void): () => void {
        this.logListeners.push(listener);
        return () => {
            const index = this.logListeners.indexOf(listener);
            if (index !== -1) {
                this.logListeners.splice(index, 1);
            }
        };
    }

    private log(message: string) {
        // console.log(message);
        this.logListeners.forEach(listener => listener(message));
    }

    /**
     * Starts the scheduler.
     */
    public play() {
        this.started = true;
    }

    public get isEnded(): boolean {
        return this.ended;
    }

    public get spawnAheadTime(): number {
        return this.config.spawnAheadTime;
    }

    /**
     * Performs a tick of the scheduler, spawning notes and auto-missing notes as necessary.
     * This will inform all registered note spawn and note hit listeners of any spawned or auto-missed notes.
     * 
     * @param now The current time in milliseconds. This should be the elapsed time since the start of the song.
     * @returns 
     */
    public tick(now: number): void {
        if (!this.started || this.ended) {
            return;
        }

        // 1. Spawn notes
        while (
            this.nextSpawnIndex < this.entities.length &&
            this.entities[this.nextSpawnIndex].time - this.config.spawnAheadTime - this.offset <= now
        ) {
            const entity = this.entities[this.nextSpawnIndex];
            entity.spawned = true;
            this.noteSpawnListeners.forEach(listener => listener(entity));

            this.log(`[Scheduler.tick()] Spawning entity ${entity.id} at time ${Math.floor(now)}ms (scheduled time: ${entity.time - this.offset}ms)`);
            this.nextSpawnIndex++;
        }

        // 2. Auto-miss notes that have passed the "bad" window
        while (this.nextHitIndex < this.nextSpawnIndex) {
            const entity = this.entities[this.nextHitIndex];
            const missTime = entity.time + this.config.window.bad - this.offset;

            // this.log(`[Scheduler.tick()] Checking entity ${entity.id} at time ${now} (missTime: ${missTime})`);

            if (entity.type === 'bar') {
                // this.log(`==> [Scheduler.tick()] Skipping entity ${entity.id} because it is a bar.`);
                this.nextHitIndex++;
                continue;
            } // Skip bars, as they are not judged for hits

            if (now <= missTime) {
                // this.log(`==> [Scheduler.tick()] Skipping entity ${entity.id} because it is not "missed.`);
                break;
            }; // Note is still within the "bad" window, so we don't miss it yet

            if (!entity.judged) {
                entity.judged = true;
                this.noteHitListeners.forEach(listener => listener(entity, 'miss'));
                this.log(`==> [Scheduler.tick()] Auto-missing entity ${entity.id} because it is "missed".`);
            }
            this.nextHitIndex++;
        }

        // 3. On song end, mark the scheduler as ended
        if (this.nextHitIndex >= this.entities.length) {
            this.ended = true;
            // console.log(`All notes have been judged. Marking scheduler as ended. Next hit index: ${this.nextHitIndex}, Total entities: ${this.entities.length}`);
            // setTimeout(() => { this.ended = true; }, 3000); // Allow the last note to be judged for "bad" before ending
        }
    }

    /**
     * Finds the next unjudged note that is closest to the current time.
     * @param now The current time in milliseconds.
     * @returns The next unjudged note or null if all notes have been judged or there are no notes in the hit window.
     */
    private findNextUnjudgedNote(input: InputType, now: number): ScheduledNote | null {
        let smallestAbsoluteTimeDifference = Infinity;
        let closestNote: ScheduledNote | null = null;

        let index = this.nextHitIndex;

        while (index < this.entities.length) {
            const entity = this.entities[index];
            this.log(`[Scheduler.findNextUnjudgedNote()] Checking entity ${entity.id} at time ${now} (scheduled time: ${entity.time - this.offset}ms)`);

            index++;

            // Skip bars
            if (entity.type === 'bar') {
                // this.log(`==> [Scheduler.findNextUnjudgedNote()] Skipping entity ${entity.id} because it is a bar.`);
                continue;
            }

            // Skip notes that don't match the input type
            if (['don', 'bigDon'].includes(entity.type) && input !== 'don') {
                // this.log(`==> [Scheduler.findNextUnjudgedNote()] Skipping entity ${entity.id} because it is a ${entity.type} and input is ${input}.`);
                continue;
            }

            if (['ka', 'bigKa'].includes(entity.type) && input !== 'ka') {
                // this.log(`==> [Scheduler.findNextUnjudgedNote()] Skipping entity ${entity.id} because it is a ${entity.type} and input is ${input}.`);
                continue;
            }

            // Skip notes that are not spawned yet, or already judged
            if (!entity.spawned || entity.judged) {
                // this.log(`==> [Scheduler.findNextUnjudgedNote()] Skipping entity ${entity.id} because it is ${!entity.spawned ? 'not spawned' : 'already judged'}.`);
                continue;
            }

            const absoluteTimeDifference = Math.abs(entity.time - now - this.offset);

            // Heuristic:
            // - All notes are sorted in ascending time order, so absolute time differences will be "convex".
            // - Whenever the current absolute time difference exceeds the smallest absolute time difference found so far, we can break the loop.
            if (absoluteTimeDifference <= Math.min(this.config.window.bad, smallestAbsoluteTimeDifference)) {
                this.log(`==> [Scheduler.findNextUnjudgedNote()] Found a closer note: ${entity.id} with time difference: ${absoluteTimeDifference}`);
                smallestAbsoluteTimeDifference = absoluteTimeDifference;
                closestNote = entity;
            } else {
                break;
            }
        }

        this.log(`Closest note found: ${closestNote ? closestNote.id : 'none'} with time difference: ${smallestAbsoluteTimeDifference}`);
        return closestNote;
    }

    /**
     * Judges the hit accuracy of a note based on the current time.
     * @param note The note to judge.
     * @param now The current time in milliseconds.
     * @returns The accuracy of the hit.
     */
    private judgeNoteHit(note: ScheduledNote, now: number): Accuracy {
        const timeDifference = Math.abs(note.time - now - this.offset);

        if (timeDifference <= this.config.window.good) {
            return 'good';
        } else if (timeDifference <= this.config.window.ok) {
            return 'ok';
        } else {
            return 'bad';;
        }
    }

    /**
     * Attempts to hit a note with the given input and current time.
     * This will also notify all registered note hit listeners with the result of the hit attempt.
     * 
     * @param input The input type ('don' or 'ka') used to hit the note.
     * @param now The current time in milliseconds.
     * @returns The accuracy of the hit ('good', 'ok', 'bad', 'miss', or 'none').
     */
    public tryHit(input: InputType, now: number): Accuracy {
        this.log(`Trying to hit note with input ${input} at time ${now}`);

        if (!this.started || this.ended) {
            this.noteHitListeners.forEach(listener => listener(null as any, 'none'));
            return 'none';
        }

        const candidateNote = this.findNextUnjudgedNote(input, now);

        if (!candidateNote) {
            this.noteHitListeners.forEach(listener => listener(null as any, 'none'));
            return 'none';
        }

        const result = this.judgeNoteHit(candidateNote, now);
        candidateNote.judged = true;
        this.noteHitListeners.forEach(listener => listener(candidateNote, result));

        return result;
    }
}