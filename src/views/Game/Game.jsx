import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

const Game = ({ levels, questions, language }) => {
  const { data, fetchAnswers } = useDedalo();
  const [levelCount, setLevelCount] = useState(1);
  const firstLevelId = levels[0].id;
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[firstLevelId]
  );
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    fetchAnswers(currentQuestion, language);
  }, [fetchAnswers, currentQuestion, language]);

  useEffect(() => {
    data && setAnswers(Object.values(data.answers));
  }, [data]);

  if (!data || !answers) {
    return null;
  }

  return (
    <>
      <GameHeader levelCount={levelCount} maxLevel={levels.length} />
      <QuestionCard currentQuestion={currentQuestion} answers={answers} />
    </>
  );
};

export default Game;
