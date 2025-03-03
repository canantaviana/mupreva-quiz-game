import { useState } from "react";
import { GameContext } from "./GameContext";

const GameProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("intro");
  const [language, setLanguage] = useState("vlca");
  const [levels, setLevels] = useState([]);
  const [levelCount, setLevelCount] = useState(1);
  const [title, setTitle] = useState({});
  const [win, setWin] = useState(false);
  const [gameUrlPath, setGameUrlPath] = useState("");
  const [cheater, setCheater] = useState(false);
  const [gameId, setGameId] = useState("");

  return (
    <GameContext.Provider
      value={{
        currentView,
        setCurrentView,
        language,
        setLanguage,
        levels,
        setLevels,
        levelCount,
        setLevelCount,
        title,
        setTitle,
        win,
        setWin,
        gameUrlPath,
        setGameUrlPath,
        cheater,
        setCheater,
        gameId,
        setGameId,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
