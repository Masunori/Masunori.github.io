/**
 * Creates a game clock that synchronizes the audio playback with the game time.
 * It ensures that the audio starts playing after a specified lead-in time and provides the current game time in milliseconds.
 * 
 * @param leadInMs The lead-in time in milliseconds before the audio starts playing. During this time, the game clock will return negative values until the lead-in period has passed.
 * @returns A game clock object with a `now` method that returns the current game time in milliseconds.
 */
export type GameClock = {
    leadInMs: number;
    now(audio: HTMLAudioElement): number;
}

export default function createGameClock(leadInMs: number): GameClock {
    const gameStartTime = performance.now();
    let audioStarted = false;

    return {
        leadInMs,
        now(audio: HTMLAudioElement): number {
            const elapsed = performance.now() - gameStartTime;

            if (elapsed < leadInMs) {
                return elapsed - leadInMs;
            }

            if (!audioStarted) {
                audio.play();
                audioStarted = true;
            }

            return audio?.currentTime * 1000;
        }
    }
}