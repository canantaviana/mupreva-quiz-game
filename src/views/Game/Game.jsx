import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

const Game = ({ levels, questions, language }) => {
  const { answers, correctAnswerId, loading, fetchAnswers } = useDedalo();
  const [levelCount, setLevelCount] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[levels[0].id]
  );

  useEffect(() => {
    fetchAnswers(currentQuestion, language);
  }, [fetchAnswers, currentQuestion, language]);

  if (loading) return null;

  return (
    <>
      <GameHeader levelCount={levelCount} maxLevel={levels.length} />
      <QuestionCard
        currentQuestion={currentQuestion}
        answers={answers}
        correctAnswerId={correctAnswerId}
      />
    </>
  );
};

export default Game;
