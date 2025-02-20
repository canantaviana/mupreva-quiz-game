import { useContext } from "react";
import GameContext from "@/context/GameProvider";

const useGame = () => useContext(GameContext);

export default useGame;
