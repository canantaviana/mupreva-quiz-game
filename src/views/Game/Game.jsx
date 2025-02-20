import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import useGame from "@/hooks/useGame";
import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

const Game = ({ questions }) => {
  const { answers, correctAnswerId, loading, fetchAnswers } = useDedalo();
  const { setCurrentView, language, levels, levelCount, setLevelCount } =
    useGame();
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[levels[0].id]
  );
  const [hintIds, setHintIds] = useState([]);

  useEffect(() => {
    fetchAnswers(currentQuestion, language);
  }, [fetchAnswers, currentQuestion, language]);

  const checkResult = (isCorrect) => {
    if (isCorrect) {
      setCurrentQuestion(questions[levels[levelCount].id]);
      setLevelCount((prev) => prev + 1);
    } else {
      setCurrentView("thanks");
    }
  };

  const fiftyFifty = () => {
    const wrongAnswersIds = answers
      .map((answer) => answer.id)
      .filter((id) => id !== correctAnswerId);
    const randomIndex = Math.floor(Math.random() * wrongAnswersIds.length);
    wrongAnswersIds.splice(randomIndex, 1);
    setHintIds(wrongAnswersIds);
  };

  if (loading) return null;

  return (
    <>
      <GameHeader
        levelCount={levelCount}
        maxLevel={levels.length}
        activateFiftyFifty={fiftyFifty}
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
