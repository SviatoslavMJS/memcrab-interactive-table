import { Cell } from "../types";

export const findNearestCells = (
  matrix: Cell[][],
  targetValue: number,
  count: number = 5
): Cell[] => {
  const flattened = matrix.flat();
  const sorted = flattened.sort(
    (a, b) =>
      Math.abs(a.amount - targetValue) - Math.abs(b.amount - targetValue)
  );
  return sorted.slice(0, count);
};

export const getAmountPercent = (sum: number, amount: number) => {
  const percent = amount / (sum / 100);
  return parseFloat(percent.toFixed(1));
};

export const parseMatrix = (matrix: Cell[][]) => {
  const rowSumValues: number[] = [];
  const colSumValues: number[] = [];
  const cells: Cell[] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      rowSumValues[rowIndex] = (rowSumValues[rowIndex] ?? 0) + cell.amount;
      colSumValues[colIndex] = (colSumValues[colIndex] ?? 0) + cell.amount;
      cells.push(cell);
    });
  });

  return {
    cells,
    colSumValues,
    rowSumValues,
    averageValues: colSumValues.map((num) => num / 2),
  };
};
