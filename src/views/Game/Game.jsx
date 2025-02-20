import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import useGame from "@/hooks/useGame";
import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

const Game = ({ questions }) => {
  const { answers, correctAnswerId, loading, fetchAnswers } = useDedalo();
  const {
    resetAnswers,
    setCurrentView,
    language,
    levels,
    levelCount,
    setLevelCount,
  } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[levels[0].id]
  );

  useEffect(() => {
    fetchAnswers(currentQuestion, language);
  }, [fetchAnswers, currentQuestion, language]);

  const checkResult = (isCorrect) => {
    resetAnswers();
    if (isCorrect) {
      setCurrentQuestion(questions[levels[levelCount].id]);
      setLevelCount((prev) => prev + 1);
    } else {
      setCurrentView("thanks");
    }
  };

  if (loading) return null;

  return (
    <>
      <GameHeader levelCount={levelCount} maxLevel={levels.length} />
      <QuestionCard
        currentQuestion={currentQuestion}
        answers={answers}
        correctAnswerId={correctAnswerId}
        checkResult={checkResult}
      />
    </>
  );
};

export default Game;
