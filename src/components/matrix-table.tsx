import { useContext } from "react";

import { MatrixContext } from "../context/matrix-context";
import CloseCircle from "../assets/icons/close-circle.svg?react";

const MatrixTable: React.FC = () => {
  const { matrix, incrementCellValue, highlightNearestCells, removeRow } =
    useContext(MatrixContext);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    incrementCellValue(rowIndex, colIndex);
  };

  const handleCellHover = (rowIndex: number, colIndex: number) => {
    highlightNearestCells(rowIndex, colIndex);
  };

  const cellsArray = new Array(matrix[0].length).fill("");

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          {cellsArray.map((_, idx) => (
            <th key={idx}>Cell value N = {idx + 1}</th>
          ))}
          <th>Sum values</th>
          {/* <th></th> */}
        </tr>
      </thead>

      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>Cell value M = {rowIndex + 1}</td>
            {row.map((cell, colIndex) => (
              <td
                key={cell.id}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onMouseOver={() => handleCellHover(rowIndex, colIndex)}
              >
                {cell.amount}
              </td>
            ))}
            <td>
              <div className="sum-wrapper">
                <p>sum</p>
                <CloseCircle
                  className="close-button"
                  onClick={() => removeRow(rowIndex)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td>Average values</td>
          {cellsArray.map((_, idx) => (
            <td key={idx}>{idx + 1}</td>
          ))}
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default MatrixTable;
