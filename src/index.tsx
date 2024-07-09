import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./app";

const rootContainer = document.getElementById("root");

if (rootContainer) {
  const root = createRoot(rootContainer);
  root.render(<App />);
} else {
  console.error("Root container element not found.");
}
