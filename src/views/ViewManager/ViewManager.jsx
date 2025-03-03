import { useEffect, useState } from "react";
import useGame from "@/hooks/useGame";
import Intro from "@/views/Intro/Intro";
import GameCountdown from "@/components/GameCountdown/GameCountdown";
import Game from "@/views/Game/Game";
import Thanks from "@/views/Thanks/Thanks";
import Credits from "@/views/Credits/Credits";
import defaultBackground from "@/assets/img/background.jpg";

const ViewManager = ({ gameData }) => {
  const { currentView, setCurrentView, setLanguage, setLevels, setTitle } =
    useGame();
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    setTitle(gameData.title);
    window.document.body.style.backgroundImage = gameData.backgroundImage.vlca
      ? `url(${gameData.backgroundImage.vlca})`
      : `url(${defaultBackground})`;
  }, [setTitle, gameData]);

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
        <Intro startGame={startGame} logo={gameData.logoImage.vlca} />
      )}

      {currentView === "countdown" && <GameCountdown />}

      {currentView === "game" && <Game questions={questions} />}

      {currentView === "thanks" && <Thanks />}
      {currentView === "credits_vlca" && (
        <Credits lang={"vlca"} content={gameData.credits.vlca} />
      )}
      {currentView === "credits_spa" && (
        <Credits lang={"spa"} content={gameData.credits.spa} />
      )}
    </>
  );
};

export default ViewManager;
