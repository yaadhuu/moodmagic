// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"; // Ensure it imports App.css, not index.css (as index.css content is now in App.css)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);