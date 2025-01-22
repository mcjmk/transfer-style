import "bootstrap/dist/css/bootstrap.min.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
