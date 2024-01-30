import { useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";

const useGameState = () => {
  return useContext(GameStateContext);
};

export default useGameState;
