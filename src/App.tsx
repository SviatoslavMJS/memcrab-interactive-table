import { useContext } from "react";

import "./App.css";
import { MatrixContextType } from "./types";
import MatrixTable from "./components/matrix-table";
import { FormModal } from "./components/form-modal";
import { MatrixContext } from "./context/matrix-context";

function App() {
  const { matrix, addRow } = useContext<MatrixContextType>(MatrixContext);

  return (
    <>
      <div className="container">
        <h1>Memcrab Matrix Table</h1>
        <FormModal />

        {!!matrix.length && (
          <>
            <MatrixTable />
            <button className='button' onClick={addRow}>Add New Row +</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
