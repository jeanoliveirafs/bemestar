import { createRoot } from "react-dom/client";
import { StrictMode, useEffect } from "react";
import App from "./App";
import "./index.css";
import "./styles/theme-transition.css";

// Função de inicialização de tema removida - tema fixo

// Tema fixo - não precisa de inicialização dinâmica

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
