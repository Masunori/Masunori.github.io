export type NoteType = 'don' | 'ka' | 'bigDon' | 'bigKa' | 'drumroll' | 'bigDrumroll' | 'balloon' | 'kusudama';
export type Accuracy = 'good' | 'ok' | 'bad' | 'miss' | 'none';
export type InputType = 'don' | 'ka';

// export type Note = {
//     type: NoteType;
//     time: number; // Time in milliseconds when the note should be hit
//     duration?: number; // Optional duration for rolling notes
//     balloonHitCount?: number; // Optional count for balloon hits
// }

export type Bar = {
    type: "bar";
    time: number; // Time in milliseconds when the bar occurs
}

type BaseNote = {
    time: number;
};

type DurationNote = BaseNote & { 
    type: 'drumroll' | 'bigDrumroll' | 'kusudama';
    duration: number;
};

type BalloonNote = BaseNote & { 
    type: 'balloon';
    duration: number;
    balloonHitCount: number;
};

type InstantNote = BaseNote & {
    type: 'don' | 'ka' | 'bigDon' | 'bigKa';
};

export type Note = DurationNote | BalloonNote | InstantNote;
export type Entity = Note | Bar;

export type Course = 'easy' | 'normal' | 'hard' | 'oni' | 'ura';
export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ChartMetadata = {
    title: string;
    titleJapanese?: string;
    titleZh?: string;

    subtitle?: string;
    subtitleJapanese?: string;
    subtitleZh?: string;
    wave?: string; // ogg file path

    bpm: number;
    offset?: number; // Offset in milliseconds to sync the chart with the audio
    demostart?: boolean; 

    maker?: string;
    preimage?: string; // Optional path to a preimage for the chart
    bgmovie?: string; // Optional path to a background movie for the chart
    bgimage?: string; // Optional path to a background image for the chart
    lyrics?: string; // Optional path to a lyrics file for the chart

    course: Course; // Optional course name for the chart
    level: Level; // Optional difficulty level for the chart

    noteCount: number; // Total number of notes in the chart
}

export type Chart = {
    metadata: ChartMetadata;
    notes: Entity[];
}

export class IllegalNoteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IllegalNoteError";
    }
};

export class IllegalLevelAssignmentError extends Error {
    constructor(course: Course, level: Level) {
        super(`Invalid level ${level} for course ${course}. Easy courses can only have levels 1-5, Normal courses can only have levels 1-7, Hard courses can only have levels 1-8, Oni and Ura courses can only have levels 1-10.`);
        this.name = "IllegalLevelAssignmentError";
    }
}