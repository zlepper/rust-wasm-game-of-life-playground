const dead = 0;
const alive = 1;

export class JsUniverse {
    constructor() {
        this.width = 64;
        this.height = 64;

        const cells = [];
        for (let i = 0; i < this.width * this.height; i++) {
            if (i % 2 === 0 || i % 7 === 0) {
                cells.push(alive);
            } else {
                cells.push(dead);
            }
        }

        this.cells = cells;
    }

    getIndex(row, column) {
        return row * this.width + column;
    }

    liveNeighborCount(row, column) {
        let count = 0;
        for (const deltaRow of [this.height - 1, 0, 1]) {
            for (const deltaCol of [this.width - 1, 0, 1]) {
                if (deltaRow === 0 && deltaCol === 0) {
                    continue;
                }

                const neighborRow = (row + deltaRow) % this.height;
                const neighborCol = (column + deltaCol) % this.width;
                const idx = this.getIndex(neighborRow, neighborCol);
                count += this.cells[idx];
            }
        }
        return count;
    }

    tick() {
        const next = [];
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const idx = this.getIndex(row, col);
                const cell = this.cells[idx];
                const liveNeighbors = this.liveNeighborCount(row, col);

                if (cell === alive) {
                    if (liveNeighbors < 2) {
                        next[idx] = dead;
                    } else if (liveNeighbors === 2 || liveNeighbors === 3) {
                        next[idx] = alive;
                    } else {
                        next[idx] = dead;
                    }
                } else {
                    if (liveNeighbors === 3) {
                        next[idx] = alive;
                    } else {
                        next[idx] = cell;
                    }
                }
            }
        }
        this.cells = next;
    }

    render() {
        let s = "";
        const total = this.width * this.height;
        for (let i = 0; i < total; i++) {
            if (i > 0 && i % this.width === 0) {
                s += '\n';
            }
            const cell = this.cells[i];

            const symbol = cell === dead ? '◻' : '◼';
            s += symbol;
        }
        return s;
    }
}