import { Cell } from "../types";

export const findNearestCells = (matrix: Cell[][], targetValue: number, count: number = 5): Cell[] => {
    const flattened = matrix.flat();
    const sorted = flattened.sort((a, b) => Math.abs(a.amount - targetValue) - Math.abs(b.amount - targetValue));
    return sorted.slice(0, count);
};