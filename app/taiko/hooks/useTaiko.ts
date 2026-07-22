import { useCallback, useEffect, useRef, useState } from "react";
import { Accuracy, Chart, Entity } from "../utils/types";
import TaikoScheduler, { DEFAULT_CONFIG } from "../utils/scheduler";
import createGameClock, { GameClock } from "../utils/gameClock";

export type VisibleEntity = Entity & { id: number };
const LEAD_IN_MS = 2000; // Lead-in time in milliseconds before the first note appears

/**
 * A custom React hook that manages the state and logic for a Taiko rhythm game. 
 * 
 * It handles audio playback, note scheduling, and user input.
 * 
 * @param chart The chart data containing metadata and notes for the song.
 * @param audioSrc The source URL for the audio file.
 * @returns An object containing the visible notes, last accuracy, combo, audio reference, game status, the current game time, and a function to start the game.
 */
export default function useTaiko(chart: Chart, audioSrc: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const schedulerRef = useRef<TaikoScheduler | null>(null);
    const rafRef = useRef<number | null>(null);
    const gameClockRef = useRef<GameClock | null>(null);
    const [now, setNow] = useState<number>(-LEAD_IN_MS);

    const [visibleNotes, setVisibleNotes] = useState<VisibleEntity[]>([]);
    const [lastAccuracy, setLastAccuracy] = useState<Accuracy | null>(null);
    const [combo, setCombo] = useState<number>(0);
    const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'playing' | 'ended'>('idle');

    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        addLog(`Loaded chart: ${JSON.stringify(chart)}`);
    }, []);

    function addLog(message: string) {
        setLogs(prev => [...prev, message]);
    }

    const start = useCallback(async () => {
        const audio = audioRef.current;
        const scheduler = schedulerRef.current;

        if (!audio || !scheduler || status !== 'ready') return;
        setStatus('playing');
        gameClockRef.current = createGameClock(LEAD_IN_MS);

        scheduler.play();

        function loop() {
            const currentNow = gameClockRef.current!.now(audio!); // Convert to milliseconds
            scheduler!.tick(currentNow);
            setNow(currentNow);

            if (scheduler!.isEnded) {
                setStatus('ended');
                return;
            }

            rafRef.current = requestAnimationFrame(loop);
        }
        rafRef.current = requestAnimationFrame(loop);
    }, [status]);

    useEffect(() => {
        setStatus('loading');

        const audio = new Audio(audioSrc);
        audio.preload = 'auto';
        audioRef.current = audio;

        const scheduler = new TaikoScheduler(chart.notes, DEFAULT_CONFIG, (chart.metadata.offset ?? 0) * 1000);
        schedulerRef.current = scheduler;

        let nextId: number = 0;
        const unsubSpawn = scheduler.registerEntitySpawnListener((entity) => {
            setVisibleNotes((prev) => [...prev, { ...entity, id: nextId++ }]);
        });

        const unsubHit = scheduler.registerNoteHitListener((entity, accuracy) => {
            setLastAccuracy(accuracy);

            setCombo((c) => (accuracy === 'good' || accuracy === 'ok' ? c + 1 : 0));

            if (entity) {
                setVisibleNotes((prev) => prev.filter((n) => !(n.time === entity.time && n.type === entity.type)));
            }
        });

        const unsubLog = scheduler.registerLogListener((message) => {
            addLog(message);
        });

        const onCanPlay = () => setStatus('ready');
        audio.addEventListener('canplaythrough', onCanPlay, { once: true });
        audio.load();

        function handleKeyDown(event: KeyboardEvent) {
            if (event.repeat || !gameClockRef.current) return;
            const key = event.key.toLowerCase();

            if (key === 'g' || key === 'h') {
                scheduler.tryHit('don', gameClockRef.current.now(audio));
            } else if (key === 'f' || key === 'j') {
                scheduler.tryHit('ka', gameClockRef.current.now(audio));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            unsubSpawn();
            unsubHit();
            unsubLog();
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
            audio.removeEventListener('canplaythrough', onCanPlay);
            audioRef.current = null;
            schedulerRef.current = null;
            audio.pause();

            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [audioSrc, chart]);

    return { visibleNotes, lastAccuracy, combo, audioRef, status, start, now, logs, addLog };
}