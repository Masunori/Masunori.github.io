"use client";

import { useEffect, useState } from 'react';
import useKeyBinding from './hooks/useAudioOnKey';
import styles from './page.module.css';
import { Chart, Note } from './utils/types';
import useTaiko, { VisibleEntity } from './hooks/useTaiko';
import parseChart from './utils/parser';
import { readFile } from 'fs';
import { parse } from 'path';

type Button = "LR" | "LF" | "RR" | "RF";
const kusushikiChartText = `
TITLE:Kusushiki
BPM:138
LEVEL:8
COURSE:Oni
OFFSET:-0.4348
#START
1000200110102001,
1010202210102001,
1000200110102001,
1020200220101020,
1000201210102000,
1000201210102000,
1011202210102020,
1020022112212000,
1001200110102001,
1010202210102000,
1001200110102001,
1020200220101020,
1000201210102011,
1001201210102010,
2022202020202020,
30303020,
1002101110221120,
1222102011101020,
1002101110221120,
1222102022202010,
1002102220221120,
1222102011101020,
1001202010102022,
1020102011112110,
2000202020200020,
1020202200000000,
#END
`;

/*
1000100110101001,
1010101110202020,
10101010,
20202020,
1000102210001000,
1000102210001000,
1120221011202210,
*/

const demoChart = parseChart(kusushikiChartText);

type NoteProps = {
    note: Note;
    x: number; // X position of the note
}

const TOTAL_CHART_LENGTH = 82;
const LENGTH_TO_JUDGEMENT_ZONE = 63;

const JUDGEMENT_ZONE_START = TOTAL_CHART_LENGTH - LENGTH_TO_JUDGEMENT_ZONE;

function NoteComponent({ note, x }: NoteProps) {
    return (
        <div className={`${styles.note} ${styles[note.type]}`} style={{ left: `${x}rem` }}> 
            {/* {note.time} {x} */}
        </div>
    )
}

function BarComponent({ x }: { x: number }) {
    return (
        <div className={styles.bar} style={{ left: `${x}rem` }}>
            {/* {x} */}
        </div>
    )
}

type NoteLaneProps = {
    visibleEntities: VisibleEntity[];
    now: number; // Current time in milliseconds
    spawnAheadTime: number; // Spawn ahead time in milliseconds
    offset: number; // Optional offset in milliseconds to sync the chart with the audio
}

function NoteLane({ visibleEntities, now, spawnAheadTime, offset }: NoteLaneProps) {
    return (
        <div className={styles.noteLane}>
            {visibleEntities.map((entity) => {
                const timeDelta = now - entity.time + offset;

                if (timeDelta > spawnAheadTime) {
                    return null;
                }

                const x = JUDGEMENT_ZONE_START - (timeDelta / spawnAheadTime) * LENGTH_TO_JUDGEMENT_ZONE;

                // return <NoteComponent note={{ type: "don", time: 0 }} x={19}  />

                if (entity.type === 'bar') {
                    return <BarComponent key={`bar-${entity.id}`} x={x} />;
                } else {
                    return <NoteComponent key={`${entity.type}-${entity.id}`} note={entity} x={x} />;
                }
            })}
        </div>
    );
}

export default function Page() {
    const [isActive, setIsActive] = useState<Button | null>(null);
    const [keyPressed, setKeyPressed] = useState<string | null>(null);

    const noteCount = demoChart.metadata.noteCount;
    const goodNotePoint = Math.ceil(1000000 / noteCount);
    const okNotePoint = Math.ceil(goodNotePoint / 2);

    const [points, setPoints] = useState<number>(0);
    const [hitAreaColor, setHitAreaColor] = useState<string>('transparent');
    const { visibleNotes, lastAccuracy, combo, status, start, now, logs } = useTaiko(demoChart, "/taiko/songs/kusushiki-mrs-green-apple.mp3");

    useEffect(() => {
        if (lastAccuracy === 'good') {
            setHitAreaColor('#c2d216');
        } else if (lastAccuracy === 'ok') {
            setHitAreaColor('cyan');
        } else {
            setHitAreaColor('transparent');
        }

        setTimeout(() => {
            setHitAreaColor('transparent');
        }, 100);
    }, [lastAccuracy]);

    useEffect(() => {
        setPoints((prev) => {
            if (lastAccuracy === 'good') {
                return prev + goodNotePoint;
            } else if (lastAccuracy === 'ok') {
                return prev + okNotePoint;
            }
            return prev;
        })
    }, [lastAccuracy, combo]);

    const { activeKey: kaActive } = useKeyBinding('ka', ['f', 'F', 'j', 'J']);
    const { activeKey: donActive } = useKeyBinding('don', ['g', 'G', 'h', 'H']);

    useEffect(() => {
        if (kaActive) {
            setIsActive(kaActive.toLowerCase() === 'f' ? 'LR' : 'RR');
            setKeyPressed(kaActive);
        };

        if (donActive) {
            setIsActive(donActive.toLowerCase() === 'g' ? 'LF' : 'RF');
            setKeyPressed(donActive);
        }

        setTimeout(() => {
            setIsActive(null);
        }, 100); // Reset after 100ms
    }, [kaActive, donActive]);

    return (
        <div className={styles.page}>
            <h1>Taiko</h1>
            <button onClick={start} disabled={status !== 'ready'}>
                Start
            </button>
            <p>Press F or J for Ka, G or H for Don</p>
            <ul>
                <li>Time elapsed: {Math.floor(now / 1)}ms</li>
                <li>Status: {status}</li>
            </ul>
            <div className={styles.drumAndChartContainer}>
                <div className={styles.drumContainer}>
                    <div className={styles.left}>
                        <div className={`${styles.rim} ${isActive === 'LR' ? styles.active : ''}`}></div>
                        <div className={`${styles.face} ${isActive === 'LF' ? styles.active : ''}`}></div>
                    </div>
                    <div className={styles.right}>
                        <div className={`${styles.rim} ${isActive === 'RR' ? styles.active : ''}`}></div>
                        <div className={`${styles.face} ${isActive === 'RF' ? styles.active : ''}`}></div>
                    </div>
                </div>
                <NoteLane visibleEntities={visibleNotes} now={now} spawnAheadTime={2000} offset={(demoChart.metadata.offset ?? 0) * 1000} />
                <div className={styles.rightSideChartHider} />
                <div className={`
                    ${styles.hitArea} 
                    ${isActive ? styles.active : ''}
                    ${isActive === 'LR' || isActive === 'RR' ? styles.rim : ''}
                    ${isActive === 'LF' || isActive === 'RF' ? styles.face : ''}
                `}>
                    <div className={styles.line} />
                    <div className={styles.circle}>
                        <div 
                            className={`${styles.circleInner}`}
                            style={{
                                backgroundColor: hitAreaColor,
                            }} 
                        />
                    </div>
                    <div className={styles.line} />
                </div>
                <div className={styles.combo}>{combo}</div>
                <div className={styles.accuracy}>{lastAccuracy?.toUpperCase()}</div>
                <div className={styles.points}>{String(points).padStart(7, '0')}</div>
            </div>
            {/* <div className={styles.logsContainer}>
                <div className={styles.logs}> 
                    {logs.map((log, index) => (
                        <p key={index}>{'> ' + log}</p>
                    ))}
                </div>
            </div> */}
        </div>
    );
}