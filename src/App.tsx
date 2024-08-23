import { useContext } from "react";
import "./App.css";
import { MatrixContext } from "./context/matrix-context";
import { MatrixContextType } from "./types";
import MatrixTable from "./components/matrix-table";
import AddRowButton from "./components/add-button";

function App() {
  const context = useContext<MatrixContextType>(MatrixContext);
  console.log(context);

  return (
    <div className="container">
      <h1>Memcrab Matrix Table</h1>
      <MatrixTable />
      <AddRowButton />
    </div>
  );
}

export default App;
