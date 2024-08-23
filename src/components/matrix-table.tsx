import { useContext, useState } from "react";

import { getAmountPercent, parseMatrix } from "../utils";
import { MatrixContext } from "../context/matrix-context";
import CloseCircle from "../assets/icons/close-circle.svg?react";

import { AmountCell } from "./amount-cell";

const MatrixTable: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>();
  const { matrix, removeRow } = useContext(MatrixContext);

  const { averageValues, rowSumValues } = parseMatrix(matrix);

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {averageValues.map((_, idx) => (
            <th key={idx}>Cell {idx + 1}</th>
          ))}
          <th>Sum values</th>
        </tr>
      </thead>

      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>Row {rowIndex + 1}</td>

            {row.map((cell, colIndex) => {
              const showPercent =
                typeof hoveredIndex === "number" && hoveredIndex === rowIndex;
              const percentAmount = getAmountPercent(
                rowSumValues[rowIndex],
                cell.amount
              );

              return (
                <AmountCell
                  cell={cell}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  showPercent={showPercent}
                  percentAmount={percentAmount}
                />
              );
            })}

            <td
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseEnter={() => setHoveredIndex(rowIndex)}
            >
              <div className="sum-wrapper">
                <p>{rowSumValues[rowIndex]}</p>

                <div className="close-container">
                  <CloseCircle
                    className="close-button"
                    onClick={() => removeRow(rowIndex)}
                  />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td>Average values</td>
          {averageValues.map((val, idx) => (
            <td key={idx}>{val}</td>
          ))}
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default MatrixTable;
