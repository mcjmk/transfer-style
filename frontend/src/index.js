import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

root.render(
  <>
    <App />
  </>
  // Should not do it, but will need it for the moment :)
  // <StrictMode>
  //   <App />
  // </StrictMode>
);
