type CellId = number;

type CellValue = number;

type Cell = {
  id: CellId;
  amount: CellValue;
};

type MatrixContextType = {
    matrix: Cell[][];
    incrementCellValue: (rowIndex: number, colIndex: number) => void;
    highlightNearestCells: (rowIndex: number, colIndex: number) => void;
    removeRow: (rowIdex: number) => void;
    addRow: () => void;
};

export type { CellId, CellValue, Cell, MatrixContextType };
