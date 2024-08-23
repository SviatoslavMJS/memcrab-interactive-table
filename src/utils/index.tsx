import { v4 as uuidv4 } from "uuid";

import { Cell } from "../types";

export const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100;
};

export const generateInitialMatrix = (M: number, N: number): Cell[][] => {
  const matrix: Cell[][] = [];
  for (let i = 0; i < M; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < N; j++) {
      row.push({ id: uuidv4(), amount: generateRandomAmount() });
    }
    matrix.push(row);
  }
  return matrix;
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

export const getNearestCells = ({
  cell,
  matrix,
  cellsCount,
}: {
  matrix: Cell[][];
  cell: Cell | null;
  cellsCount: number;
}) => {
  if (!cell) return [];
  const { id, amount } = cell;

  return matrix
    .flat()
    .filter((cell) => cell.id !== id)
    .map((cell) => ({
      id: cell.id,
      amount: Math.abs(cell.amount - amount),
    }))
    .sort((a, b) => a.amount - b.amount)
    .slice(0, cellsCount ?? 0)
    .map((cell) => cell.id);
};
