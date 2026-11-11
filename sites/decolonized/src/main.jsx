import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Decolonized from "./Decolonized.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Decolonized />
  </StrictMode>,
);
