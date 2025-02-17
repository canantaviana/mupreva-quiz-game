import { useState } from "react";
import Intro from "../Intro/Intro";
import GameCountdown from "../../components/GameCountdown/GameCountdown";

const Game = ({ data }) => {
  const { title } = data;

  const [currentView, setCurrentView] = useState("intro");
  const [language, setLanguage] = useState(null);

  const startCount = (lang) => {
    setLanguage(lang);
    setCurrentView("countdown");
  };

  const startGame = () => {
    setCurrentView("game");
  };

  return (
    <>
      {currentView === "intro" && (
        <Intro title={title} startCount={startCount} />
      )}

      {currentView === "countdown" && <GameCountdown startGame={startGame} />}

      {currentView === "game" && <h1>Game</h1>}
    </>
  );
};

export default Game;
