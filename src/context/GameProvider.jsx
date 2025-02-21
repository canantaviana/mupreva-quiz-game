import { useState } from "react";
import { GameContext } from "./GameContext";

const GameProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("intro");
  const [language, setLanguage] = useState("vlca");
  const [levels, setLevels] = useState([]);
  const [levelCount, setLevelCount] = useState(1);
  const [title, setTitle] = useState({});

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
