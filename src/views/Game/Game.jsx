import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import useGame from "@/hooks/useGame";
import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

const Game = ({ levels, questions, language }) => {
  const { answers, correctAnswerId, loading, fetchAnswers } = useDedalo();
  const { resetAnswers } = useGame();
  const [levelCount, setLevelCount] = useState(1);
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
      alert(levels[levelCount - 1].title);
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
