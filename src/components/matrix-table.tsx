import { useContext, useState } from "react";

import { MatrixContext } from "../context/matrix-context";
import CloseCircle from "../assets/icons/close-circle.svg?react";
import { getAmountPercent, parseMatrix } from "../utils";

const MatrixTable: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>();
  const { matrix, incrementCellValue, highlightNearestCells, removeRow } =
    useContext(MatrixContext);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    incrementCellValue(rowIndex, colIndex);
  };

  const handleCellHover = (rowIndex: number, colIndex: number) => {
    highlightNearestCells(rowIndex, colIndex);
  };

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
                <td
                  key={cell.id}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  onMouseOver={() => handleCellHover(rowIndex, colIndex)}
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
