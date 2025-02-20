import { useState, createContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const resetAnswers = () => {
    setDisabledButtons(false);
    setIsRevealed(false);
  };

  return (
    <GameContext.Provider
      value={{
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
