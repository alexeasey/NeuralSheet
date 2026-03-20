import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Grid from "./components/grid/Grid";
import FormulaBar from "./components/FormulaBar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FormulaBar />
    <Grid />
  </React.StrictMode>,
);
