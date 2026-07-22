import { describe, it, expect } from "vitest";
import { Chart } from "./types";
import { readFileSync } from "fs";
import parseChart from "./parser";

const chartText1 = `
TITLE:Simple Demo Song
BPM:120
WAVE:demo.ogg
LEVEL:8
COURSE:Oni
#START
1010,
20002000,
10001000,
20002000,
30003000,
40004000,
50000080,
#END   
`;

const expectedChart1: Chart = {
    metadata: {
        title: "Simple Demo Song",
        bpm: 120,
        wave: "demo.ogg",
        course: "oni",
        level: 8,
        noteCount: 12,
    },
    notes: [
        { type: 'bar', time: 0 },
        { type: 'don', time: 0 },
        { type: 'don', time: 1000 },
        { type: 'bar', time: 2000 },
        { type: 'ka', time: 2000 },
        { type: 'ka', time: 3000 },
        { type: 'bar', time: 4000 },
        { type: 'don', time: 4000 },
        { type: 'don', time: 5000 },
        { type: 'bar', time: 6000 },
        { type: 'ka', time: 6000 },
        { type: 'ka', time: 7000 },
        { type: 'bar', time: 8000 },
        { type: 'bigDon', time: 8000 },
        { type: 'bigDon', time: 9000 },
        { type: 'bar', time: 10000 },
        { type: 'bigKa', time: 10000 },
        { type: 'bigKa', time: 11000 },
        { type: 'bar', time: 12000 },
        { type: 'drumroll', time: 12000, duration: 1500 },
    ],
};

describe("Chart Parser Tests", () => {
    it("should correctly parse a simple demo song chart", () => {
        const parsedChart = parseChart(chartText1);
        expect(parsedChart).toEqual(expectedChart1);
    });
});