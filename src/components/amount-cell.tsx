import { useContext } from "react";

import { Cell } from "../types";
import { getNearestCells } from "../utils";
import { MatrixContext } from "../context/matrix-context";

export const AmountCell = ({
  cell,
  rowIndex,
  colIndex,
  showPercent,
  percentAmount
}: {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
  showPercent: boolean;
  percentAmount: number;
}) => {
  const { matrix, values, incrementCellValue, activeCell, setActiveCell } =
    useContext(MatrixContext);

  const nearestCells = getNearestCells({
    matrix,
    cell: activeCell,
    cellsCount: +values.cellsCount,
  });

  return (
    <td
      key={cell.id}
      onMouseLeave={() => setActiveCell(null)}
      onMouseEnter={() => setActiveCell(cell)}
      onClick={() => incrementCellValue(rowIndex, colIndex)}
      className={nearestCells.includes(cell.id) ? "nearest" : ""}
      style={
        showPercent
          ? {
              background: `linear-gradient(to right, #52ae55 0% ${percentAmount}%, #242424 ${percentAmount}% 100%)`,
              color: "white",
            }
          : {}
      }
    >
      {showPercent ? `${percentAmount}%` : cell.amount}
    </td>
  );
};
