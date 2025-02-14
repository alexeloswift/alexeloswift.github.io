import React from "react";
import ReactDOM from "react-dom/client";
import App from "./root"; // Import root component
import "./app.css";

console.log("Mounting React App...");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
