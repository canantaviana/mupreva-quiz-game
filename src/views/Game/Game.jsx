import { useState } from "react";
import Intro from "../Intro/Intro";
import GameCountdown from "../../components/GameCountdown/GameCountdown";
import Questions from "../Questions/Questions";

const Game = ({ gameData }) => {
  const { title } = gameData;

  const [currentView, setCurrentView] = useState("intro");
  const [levels, setLevels] = useState([]);
  const [questions, setQuestions] = useState({});

  const startGame = (lang) => {
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
      {currentView === "intro" && <Intro title={title} startGame={startGame} />}

      {currentView === "countdown" && (
        <GameCountdown action={() => setCurrentView("questions")} />
      )}

      {currentView === "questions" && (
        <Questions levels={levels} questions={questions} />
      )}
    </>
  );
};

export default Game;
