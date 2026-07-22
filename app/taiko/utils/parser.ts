import { Chart, ChartMetadata, Course, IllegalLevelAssignmentError, IllegalNoteError, Level, Note, NoteType } from "./types";

enum NoteEnum {
    EMPTY = 0,
    DON = 1,
    KA = 2,
    BIG_DON = 3,
    BIG_KA = 4,
    DRUMROLL = 5,
    BIG_DRUMROLL = 6,
    BALLOON = 7,
    ROLL_END = 8,
    KUSUDAMA = 9,
}

const courseToMaxLevelMap: Record<Course, Level> = {
    'easy': 5,
    'normal': 7,
    'hard': 8,
    'oni': 10,
    'ura': 10,
};

export default function parseChart(chartText: string): Chart {
    const chart: Chart = {
        metadata: {} as ChartMetadata,
        notes: [],
    };
    const lines = chartText.split('\n');

    let isNotesSection = false;
    let bar = 0;
    let currentBpm = 0;
    let measure = {top: 4, bottom: 4};
    let rollStartTime = -1;
    let rollType: NoteEnum | null = null;
    let time = 0;
    let balloonHitCounts: number[] = [];
    let balloonHitCountIndex = 0;

    for (const line of lines) {
        let trimmedLine = line.trim();

        if (trimmedLine === "#START") {
            isNotesSection = true;
            chart.metadata.noteCount = 0;
            continue;
        } else if (trimmedLine === "#END") {
            isNotesSection = false;
            continue;
        }

        if (isNotesSection) {
            if (trimmedLine.startsWith("#")) {
                trimmedLine = trimmedLine.replace('#', '');

                const [command, value] = trimmedLine.split(' ');
                switch (command) {
                    case 'BPM':
                        currentBpm = parseFloat(value);
                        break;
                    case 'MEASURE':
                        const [top, bottom] = value.split('/').map(Number);
                        measure = { top, bottom };
                        break;
                    case 'BAR':
                        bar = parseInt(value, 10);
                        break;
                    default:
                        console.warn(`Unknown command: ${command}`);
                }
            } else {
                trimmedLine = trimmedLine.replace(',', '');
                const noteCount = trimmedLine.length;
                const timeDelta = (60000 * measure.top) / (currentBpm * noteCount);

                chart.notes.push({ type: 'bar', time });

                for (const note of trimmedLine) {
                    const noteType = parseInt(note, 10) as NoteEnum;

                    if (rollStartTime !== -1) {
                        // Handle drumroll notes
                        if (noteType === NoteEnum.ROLL_END) {
                            const balloonCount = rollType === NoteEnum.BALLOON ? balloonHitCounts[balloonHitCountIndex++] || 10 : 10;

                            const note: Note = rollType === NoteEnum.DRUMROLL
                                ? { type: 'drumroll', time: rollStartTime, duration: time - rollStartTime}
                                : rollType === NoteEnum.BIG_DRUMROLL
                                ? { type: 'bigDrumroll', time: rollStartTime, duration: time - rollStartTime}
                                : rollType === NoteEnum.KUSUDAMA
                                ? { type: 'kusudama', time: rollStartTime, duration: time - rollStartTime}
                                : rollType === NoteEnum.BALLOON
                                ? { type: 'balloon', time: rollStartTime, duration: time - rollStartTime, balloonHitCount: balloonCount }
                                : { type: 'don', time: rollStartTime }; // This should never happen, but TypeScript needs a fallback

                            chart.notes.push(note);
                            rollStartTime = -1; // End of drumroll
                            rollType = null;
                        } else if (noteType === NoteEnum.EMPTY || noteType === NoteEnum.DRUMROLL || noteType === NoteEnum.BIG_DRUMROLL || noteType === NoteEnum.KUSUDAMA) {
                            // Continue drumroll
                        } else {
                            throw new IllegalNoteError(`Illegal note type ${noteType} during drumroll at time ${time}`);
                        }
                    } else if (noteType === NoteEnum.EMPTY) {
                        // Skip empty notes
                    } else if (noteType === NoteEnum.DON) {
                        chart.notes.push({ type: 'don', time });
                        chart.metadata.noteCount++;
                    } else if (noteType === NoteEnum.KA) {
                        chart.notes.push({ type: 'ka', time });
                        chart.metadata.noteCount++;
                    } else if (noteType === NoteEnum.BIG_DON) {
                        chart.notes.push({ type: 'bigDon', time });
                        chart.metadata.noteCount++;
                    } else if (noteType === NoteEnum.BIG_KA) {
                        chart.notes.push({ type: 'bigKa', time });
                        chart.metadata.noteCount++;
                    } else if (noteType === NoteEnum.DRUMROLL) {
                        rollStartTime = time;
                        rollType = NoteEnum.DRUMROLL;
                    } else if (noteType === NoteEnum.BIG_DRUMROLL) {
                        rollStartTime = time;
                        rollType = NoteEnum.BIG_DRUMROLL;
                    } else if (noteType === NoteEnum.BALLOON) {
                        rollStartTime = time;
                        rollType = NoteEnum.BALLOON;
                    } else if (noteType === NoteEnum.KUSUDAMA) {
                        rollStartTime = time;
                        rollType = NoteEnum.KUSUDAMA;
                    } else {
                        throw new IllegalNoteError(`Unknown note type ${noteType} at time ${time}`);
                    }

                    time += timeDelta;
                }
            }
        } else {
            // Handle metadata lines
            const [key, value] = trimmedLine.split(':');

            // Process metadata key-value pairs
            switch (key.trim()) {
                case 'TITLE':
                    chart.metadata.title = value.trim();
                    break;
                case 'TITLEJA':
                    chart.metadata.titleJapanese = value.trim();
                    break;
                case 'TITLEZH':
                    chart.metadata.titleZh = value.trim();
                    break;
                case 'SUBTITLE':
                    chart.metadata.subtitle = value.trim();
                    break;
                case 'SUBTITLEJA':
                    chart.metadata.subtitleJapanese = value.trim();
                    break;
                case 'SUBTITLEZH':
                    chart.metadata.subtitleZh = value.trim();
                    break;
                case 'WAVE':
                    chart.metadata.wave = value.trim();
                    break;
                case 'BPM':
                    chart.metadata.bpm = parseFloat(value.trim());
                    currentBpm = chart.metadata.bpm;
                    break;
                case 'OFFSET':
                    chart.metadata.offset = parseFloat(value.trim());
                    break;
                case 'DEMOSTART':
                    chart.metadata.demostart = value.trim().toLowerCase() === 'true';
                    break;
                case 'MAKER':
                    chart.metadata.maker = value.trim();
                    break;
                case 'PREIMAGE':
                    chart.metadata.preimage = value.trim();
                    break;
                case 'BGMOVIE':
                    chart.metadata.bgmovie = value.trim();
                    break;
                case 'BGIMAGE':
                    chart.metadata.bgimage = value.trim();
                    break;
                case 'LYRICS':
                    chart.metadata.lyrics = value.trim();
                    break;
                case 'COURSE':
                    chart.metadata.course = value.trim().toLowerCase() as Course;
                    break;
                case 'LEVEL':
                    chart.metadata.level = parseInt(value.trim(), 10) as Level;
                    break;
                case 'BALLOON':
                    balloonHitCounts = value.trim().split(',').map(num => parseInt(num, 10));
                    break;
                default:
                    console.warn(`Unknown metadata key: ${key}`);
            }
        }
    }

    if (chart.metadata.level > courseToMaxLevelMap[chart.metadata.course]) {
        throw new IllegalLevelAssignmentError(chart.metadata.course, chart.metadata.level);
    };

    return chart;
}