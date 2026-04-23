import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import useGame from "@/hooks/useGame";
import useCountdown from "@/hooks/useCountdown";

import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import PlayerStats from "@/components/PlayerStats/PlayerStats";

import seleccionFx from "@/assets/sounds/seleccion.mp3"
import perderFx from "@/assets/sounds/perder.mp3"

const Game = ({ questions, playSound }) => {
  const { answers, correctAnswerId, loading, fetchAnswers } = useDedalo();
  const {
    setCurrentView,
    language,
    levels,
    levelCount,
    setLevelCount,
    setWin,
  } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[levels[0].id]
  );
  const { count, total, addTime, resetTime } = useCountdown(30, onTimeUp);
  const [hintIds, setHintIds] = useState([]);
  const [timeWildcardUsed, setTimeWildcardUsed] = useState(false);
  const [fiftyWildcardUsed, setFiftyWildcardUsed] = useState(false);
  const [audienceWildcardUsed, setAudienceWildcardUsed] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetchAnswers(currentQuestion, language);
    resetTime();
  }, [fetchAnswers, currentQuestion, language, resetTime]);

  function onTimeUp() {
    setCurrentView("thanks");
    playSound(perderFx);
  }

  function useTimeWildcard() {
    addTime(30);
    setTimeWildcardUsed(true);
    playSound(seleccionFx);
  }

  function useFiftyWildcard() {
    setFiftyWildcardUsed(true);
    disableHalfAnswers();
    playSound(seleccionFx);
  }

  function useAudienceWildcard() {
    setAudienceWildcardUsed(true);
    setShowStats(true);
    playSound(seleccionFx);
  }

  function checkResult(isCorrect) {
    if (isCorrect) {
      if (levelCount === levels.length) {
        setWin(true);
        setCurrentView("thanks");
        return;
      }
      setCurrentQuestion(questions[levels[levelCount].id]);
      setLevelCount((prev) => prev + 1);
    } else {
      setCurrentView("thanks");
    }
  }

  function disableHalfAnswers() {
    const wrongAnswersIds = answers
      .map((answer) => answer.id)
      .filter((id) => id !== correctAnswerId);
    const randomIndex = Math.floor(Math.random() * wrongAnswersIds.length);
    wrongAnswersIds.splice(randomIndex, 1);
    setHintIds(wrongAnswersIds);
  }

  if (loading) return null;

  return (
    <>
      <GameHeader
        count={count}
        total={total}
        timeUsed={timeWildcardUsed}
        useTime={useTimeWildcard}
        fiftyUsed={fiftyWildcardUsed}
        useFifty={useFiftyWildcard}
        audienceWildcardUsed={audienceWildcardUsed}
        useAudienceWildcard={useAudienceWildcard}
        showStats={showStats}
      />
      {showStats ? (
        <PlayerStats
          questionId={currentQuestion.id}
          answers={answers}
          setShowStats={setShowStats}
        />
      ) : (
        <QuestionCard
          currentQuestion={currentQuestion}
          answers={answers}
          correctAnswerId={correctAnswerId}
          checkResult={checkResult}
          hintIds={hintIds}
          playSound={playSound}
        />
      )}
    </>
  );
};

export default Game;
