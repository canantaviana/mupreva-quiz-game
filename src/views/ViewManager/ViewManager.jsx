import { useState } from "react";
import useGame from "@/hooks/useGame";
import Intro from "@/views/Intro/Intro";
import GameCountdown from "@/components/GameCountdown/GameCountdown";
import Game from "@/views/Game/Game";
import Thanks from "@/views/Thanks/Thanks";

const ViewManager = ({ gameData }) => {
  const { currentView, setCurrentView, setLanguage, setLevels } = useGame();
  const [questions, setQuestions] = useState({});

  const startGame = (lang) => {
    setLanguage(lang);
    setCurrentView("countdown");
    setLevels(gameData.levels[lang]);
    const randomQuestions = {};

    gameData.levels[lang].forEach((level) => {
      const questionsArray = gameData.questions[lang][level.id];
      const random =
        questionsArray[Math.floor(Math.random() * questionsArray.length)];
      randomQuestions[level.id] = random;
    });

    setQuestions(randomQuestions);
  };

  return (
    <>
      {currentView === "intro" && (
        <Intro title={gameData.title} startGame={startGame} />
      )}

      {currentView === "countdown" && (
        <GameCountdown action={() => setCurrentView("game")} />
      )}

      {currentView === "game" && <Game questions={questions} />}

      {currentView === "thanks" && <Thanks />}
    </>
  );
};

export default ViewManager;
