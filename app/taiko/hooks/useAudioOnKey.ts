"use client";

import { useEffect, useRef, useState } from "react";

const soundMap = {
    'balloon': '/taiko/sounds/balloon.mp3',
    'bigDon': '/taiko/sounds/big-don.mp3',
    'don': '/taiko/sounds/don.mp3',
    'donderFullCombo': '/taiko/sounds/donder-full-combo.mp3',
    'fullCombo': '/taiko/sounds/full-combo.mp3',
    'ka': '/taiko/sounds/katsu.mp3',
    'songCleared': '/taiko/sounds/song-cleared.mp3',
    'songNotCleared': '/taiko/sounds/song-not-cleared.mp3',
}

export type SoundType = keyof typeof soundMap;

/**
 * A hook that handles audio playback during a key press.
 * 
 * @param type The type of sound to play, corresponding to a key in the soundMap.
 * @param triggerKeys The keys that will trigger the sound when pressed.
 * @returns An object containing the `activeKey` state, which indicates which trigger key is currently pressed.
 * 
 * @example
 * useAudioOnKey('don', ['g', 'G', 'h', 'H']);
 * This will play the 'don' sound when the user presses G, g, H, or h.
 */
export default function useAudioOnKey(type: SoundType, triggerKeys: string[]) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [activeKey, setActiveKey] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (triggerKeys.includes(event.key) && !event.repeat) {
                setActiveKey(event.key);
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(() => {});
                }
            }

            setTimeout(() => {
                setActiveKey(null);
            }, 100); // Reset after 100ms
        };

        audioRef.current = new Audio(soundMap[type]);

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [type, triggerKeys.join(',')]); // Stabilize the dependency array by joining triggerKeys into a string

    return { activeKey };
}