type CellId = string;

type CellValue = number;

type Cell = {
  id: CellId;
  amount: CellValue;
};

type FormValues = {
  rows: string;
  columns: string;
  cellsCount: string;
};

type MatrixContextType = {
  matrix: Cell[][];
  addRow: () => void;
  values: FormValues;
  activeCell: Cell | null;
  removeRow: (rowIdex: number) => void;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  setActiveCell: React.Dispatch<React.SetStateAction<Cell | null>>;
  incrementCellValue: (rowIndex: number, colIndex: number) => void;
};

export type { CellId, CellValue, Cell, FormValues, MatrixContextType };
