import React, { createContext, useState, ReactNode, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { Cell, MatrixContextType } from "../types";

const initialContext = {
  matrix: [],
  addRow: () => {},
  removeRow: () => {},
  incrementCellValue: () => {},
  highlightNearestCells: () => {},
};

export const MatrixContext = createContext<MatrixContextType>(initialContext);

const generateRandomAmount = (): number => {
  return Math.floor(Math.random() * 900) + 100;
};

const generateInitialMatrix = (M: number, N: number): Cell[][] => {
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

export const MatrixProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [matrix, setMatrix] = useState<Cell[][]>(generateInitialMatrix(5, 5));
  const incrementCellValue = useCallback(
    (rowIndex: number, colIndex: number) => {
      console.log("outside");
      setMatrix((prevMatrix) => {
        const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
        newMatrix[rowIndex][colIndex].amount += 1;
        console.log("click", { row: newMatrix[rowIndex] });
        return newMatrix;
      });
    },
    []
  );

  const highlightNearestCells = useCallback(
    (rowIndex: number, colIndex: number) => {},
    []
  );

  const removeRow = useCallback((rowIndex: number) => {
    setMatrix((prevMatrix) => prevMatrix.filter((_, i) => i !== rowIndex));
  }, []);

  const addRow = useCallback(() => {
    setMatrix((prevMatrix) => [
      ...prevMatrix,
      prevMatrix[0].map(() => ({
        id: uuidv4(),
        amount: generateRandomAmount(),
      })),
    ]);
  }, []);

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        addRow,
        removeRow,
        incrementCellValue,
        highlightNearestCells,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
