import { v4 as uuidv4 } from "uuid";
import {
  useState,
  ReactNode,
  useEffect,
  useCallback,
  createContext,
} from "react";

import { Cell, MatrixContextType } from "../types";
import { generateInitialMatrix, generateRandomAmount } from "../utils";

const initialValues = {
  rows: "",
  columns: "",
  cellsCount: "",
};

const initialContext = {
  matrix: [],
  activeCell: null,
  addRow: () => {},
  removeRow: () => {},
  setValues: () => {},
  values: initialValues,
  setActiveCell: () => {},
  incrementCellValue: () => {},
};

export const MatrixContext = createContext<MatrixContextType>(initialContext);

export const MatrixProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [values, setValues] = useState(initialValues);
  const [activeCell, setActiveCell] = useState<Cell | null>(null);

  const incrementCellValue = useCallback(
    (rowIndex: number, colIndex: number) => {
      setMatrix((prevMatrix) => {
        const newMatrix = JSON.parse(JSON.stringify(prevMatrix));
        newMatrix[rowIndex][colIndex].amount += 1;
        return newMatrix;
      });
      if (activeCell) {
        setActiveCell({ ...activeCell, amount: activeCell?.amount + 1 });
      }
    },
    [activeCell]
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

  useEffect(() => {
    const rows = Number(values.rows);
    const columns = Number(values.columns);
    if (rows > 0 && columns > 1) {
      setMatrix(generateInitialMatrix(rows, columns));
    }
  }, [values]);

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        addRow,
        values,
        removeRow,
        setValues,
        activeCell,
        setActiveCell,
        incrementCellValue,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
