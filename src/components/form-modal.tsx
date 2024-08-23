import { useCallback, useContext, useRef, useState } from "react";

import { MatrixContext } from "../context/matrix-context";

import { Input } from "./input";

const initialValues = {
  rows: "",
  columns: "",
  cellsCount: "",
};

export const FormModal = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const { setValues } = useContext(MatrixContext);
  const ref = useRef<HTMLDialogElement>(null);

  const handleClose = useCallback(() => {
    setFormValues(initialValues);
    ref?.current?.close();
  }, [ref]);

  const handleSubmit = useCallback(() => {
    setValues(formValues);
    handleClose();
  }, [handleClose, formValues, setValues]);

  const { columns, rows, cellsCount } = formValues;
  const maxCellsCount = +columns * +rows - 1;

  return (
    <>
      <button className="button" onClick={() => ref?.current?.showModal()}>
        Create new matrix
      </button>

      <dialog ref={ref} className="modal">
          <div className="modal-container">
            <h3>Create matrix</h3>

            <Input
              value={rows}
              label="Rows (max 100)"
              onChange={(val) =>
                setFormValues((prev) => ({ ...prev, rows: val }))
              }
            />

            <Input
              value={columns}
              label="Columns (max 100)"
              onChange={(val) =>
                setFormValues((prev) => ({ ...prev, columns: val }))
              }
            />

            <Input
              max={maxCellsCount.toString()}
              value={cellsCount}
              label={`Nearest cells (max ${
                maxCellsCount > 1 ? maxCellsCount : 0
              })`}
              onChange={(val) =>
                setFormValues((prev) => ({ ...prev, cellsCount: val }))
              }
            />

            <div className="modal-footer">
              <button className="button" onClick={handleClose}>
                Close
              </button>

              <button
                disabled={
                  !rows ||
                  !columns ||
                  !cellsCount ||
                  +rows > 100 ||
                  +columns > 100 ||
                  +cellsCount > maxCellsCount
                }
                className="button"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
      </dialog>
    </>
  );
};
