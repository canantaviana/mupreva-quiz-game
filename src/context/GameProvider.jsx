import { useState, createContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("intro");
  const [language, setLanguage] = useState("vlca");
  const [levels, setLevels] = useState([]);
  const [levelCount, setLevelCount] = useState(1);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const resetAnswers = () => {
    setDisabledButtons(false);
    setIsRevealed(false);
  };

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
        disabledButtons,
        setDisabledButtons,
        isRevealed,
        setIsRevealed,
        resetAnswers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
