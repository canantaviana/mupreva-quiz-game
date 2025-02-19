import { useState } from "react";
import Intro from "../Intro/Intro";
import GameCountdown from "../../components/GameCountdown/GameCountdown";
import Game from "../Game/Game";

const ViewManager = ({ gameData }) => {
  const [language, setLanguage] = useState("vlca");
  const [currentView, setCurrentView] = useState("intro");
  const [levels, setLevels] = useState([]);
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

      {currentView === "game" && (
        <Game levels={levels} questions={questions} language={language} />
      )}
    </>
  );
};

export default ViewManager;
