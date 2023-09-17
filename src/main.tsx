import { App } from "./App.tsx";
import { ErrorBoundary } from "./components/error/ErrorBoundary.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { initializeIcons } from "@fluentui/react";
import "./index.css";

initializeIcons();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary errorComponent={<h2>Oops! Something went wrong.</h2>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
