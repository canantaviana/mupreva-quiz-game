import { useState, useEffect } from "react";
import AnswerOption from "../AnswerOption/AnswerOption";
import { delay } from "@/utils/lib";
import data_io from "../../utils/data_io";
import useGame from "@/hooks/useGame";

const SHOW_RESULT_DELAY_MS = 1000;
const NEXT_QUESTION_DELAY_MS = 2000;

const QuestionCard = ({
  currentQuestion,
  answers,
  correctAnswerId,
  checkResult,
  hintIds,
}) => {
  const [answerStates, setAnswerStates] = useState(
    answers.map((answer) => ({ id: answer.id, state: "idle" }))
  );
  const { gameId, disabledButtons, setDisabledButtons } = useGame();

  useEffect(() => {
    setAnswerStates(
      answers.map((answer) => ({ id: answer.id, state: "idle" }))
    );
  }, [answers]);

  useEffect(() => {
    setAnswerStates((prev) =>
      prev.map((answerState) => {
        if (hintIds.includes(answerState.id)) {
          return { ...answerState, state: "disabled" };
        } else {
          return answerState;
        }
      })
    );
  }, [hintIds]);

  const handleAnswerClick = async (selectedAnswerId) => {
    data_io.guardar_respuesta(currentQuestion.id, selectedAnswerId, gameId);
    setDisabledButtons(true);
    const updatedStates = answerStates.map((answerState) => {
      if (answerState.id === selectedAnswerId) {
        return { ...answerState, state: "selected" };
      } else {
        return answerState;
      }
    });

    setAnswerStates(updatedStates);

    await delay(SHOW_RESULT_DELAY_MS);

    const isCorrect = selectedAnswerId === correctAnswerId;
    const finalStates = updatedStates.map((answerState) => {
      if (answerState.id === selectedAnswerId) {
        return { ...answerState, state: isCorrect ? "correct" : "incorrect" };
      } else if (answerState.id == correctAnswerId) {
        return { ...answerState, state: "correct" };
      } else {
        return answerState;
      }
    });
    setAnswerStates(finalStates);

    await delay(NEXT_QUESTION_DELAY_MS);

    setDisabledButtons(false);
    checkResult(isCorrect);
  };

  return (
    <main className="main-content h-100 is-relative">
      <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
        <div className="preguntes w-100">
          <h2 className="has-text-weight-semibold fs-14-24 is-flex is-align-items-center has-text-centered is-justify-content-center">
            {currentQuestion.question}
          </h2>
          <ol className="preguntes__list">
            {answers.map((answer) => (
              <AnswerOption
                key={answer.id}
                text={answer.title}
                state={
                  answerStates.find(
                    (answerState) => answerState.id === answer.id
                  )?.state || "idle"
                }
                onClick={() => handleAnswerClick(answer.id)}
                disabled={disabledButtons}
              />
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
};

export default QuestionCard;
