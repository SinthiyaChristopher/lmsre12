import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { LMSProvider } from "./context/LMSContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <LMSProvider>
        <App />
      </LMSProvider>
    </HashRouter>
  </React.StrictMode>
);
