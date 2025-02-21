import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import useGame from "@/hooks/useGame";
import useCountdown from "@/hooks/useCountdown";

import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

const Game = ({ questions }) => {
  const { answers, correctAnswerId, loading, fetchAnswers } = useDedalo();
  const { setCurrentView, language, levels, levelCount, setLevelCount } =
    useGame();
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[levels[0].id]
  );
  const { count, addTime, resetTime } = useCountdown(30, onTimeUp);
  const [hintIds, setHintIds] = useState([]);
  const [timeWildcardUsed, setTimeWildcardUsed] = useState(false);
  const [fiftyWildcardUsed, setFiftyWildcardUsed] = useState(false);

  useEffect(() => {
    fetchAnswers(currentQuestion, language);
    resetTime();
  }, [fetchAnswers, currentQuestion, language]);

  function onTimeUp() {
    setCurrentView("thanks");
  }

  function useTimeWildcard() {
    addTime(30);
    setTimeWildcardUsed(true);
  }

  function useFiftyWildcard() {
    setFiftyWildcardUsed(true);
    disableHalfAnswers();
  }

  function checkResult(isCorrect) {
    if (isCorrect) {
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
        timeUsed={timeWildcardUsed}
        useTime={useTimeWildcard}
        fiftyUsed={fiftyWildcardUsed}
        useFifty={useFiftyWildcard}
      />
      <QuestionCard
        currentQuestion={currentQuestion}
        answers={answers}
        correctAnswerId={correctAnswerId}
        checkResult={checkResult}
        hintIds={hintIds}
      />
    </>
  );
};

export default Game;
