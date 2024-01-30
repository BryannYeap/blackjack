import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GameStateContextProvider from "./context/GameStateContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameStateContextProvider>
      <App />
    </GameStateContextProvider>
  </React.StrictMode>
);
