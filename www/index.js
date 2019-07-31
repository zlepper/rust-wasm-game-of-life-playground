import {Universe} from "wasm-game-of-life";
import {JsUniverse} from "./conways-js";

const pre = document.getElementById('game-of-life-canvas');
// const universe = Universe.new();
// const universe = new JsUniverse();

// function renderLoop() {
//     // console.time('render');
//     const s = universe.render();
//     // console.timeEnd('render');
//     pre.textContent = s;
//     console.time('tick');
//     universe.tick();
//     console.timeEnd('tick');
//
//     requestAnimationFrame(renderLoop);
// }
//
// requestAnimationFrame(renderLoop);

function doTimings(universe) {
    const count = 10000;
    const timings = [];
    const beforeAll = performance.now();
    for (let i = 0; i < count; i++) {
        const before = performance.now();
        universe.tick();
        const after = performance.now();
        const taken = after - before;
        timings.push(taken);
    }
    const afterAll = performance.now();
    console.log('all took', afterAll - beforeAll);

    timings.sort((a, b) => a - b);

    let total = 0;
    for (const t of timings) {
        total += t;
    }


    const average = total / count;

    const median = timings[Math.floor(count / 2)];
    const p90 = timings[Math.floor(count * 0.9)];
    const p95 = timings[Math.floor(count * 0.95)];
    const p99 = timings[Math.floor(count * 0.99)];
    const p999 = timings[Math.floor(count * 0.99)];
    const p10 = timings[Math.floor(count * 0.10)];
    const p1 = timings[Math.floor(count * 0.01)];
    const best = timings[0];
    const worst = timings[count - 1];

    console.log({total, average, median, p90, p95, p99, p999, p10, p1, best, worst});
}

console.group('js universe');
doTimings(new JsUniverse());
console.groupEnd();
console.group('wasm universe');
doTimings(Universe.new());
console.groupEnd();
