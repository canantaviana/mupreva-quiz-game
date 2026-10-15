import { useState, useEffect, useRef } from "react";
import AnswerOption from "../AnswerOption/AnswerOption";
import { delay } from "@/utils/lib";
import data_io from "../../utils/data_io";
import useGame from "@/hooks/useGame";
import useTranslations from "@/hooks/useTranslations";
import useViewFocus from "@/hooks/useViewFocus";

import ganarFx from "@/assets/sounds/ganar.mp3"
import perderFx from "@/assets/sounds/perder.mp3"

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
  // visible text with the result of the answer (the colours are not enough, WCAG 1.4.1)
  const [feedback, setFeedback] = useState("");
  const { gameId, disabledButtons, setDisabledButtons, levelCount, levels, playSound, announce } = useGame();
  const t = useTranslations();
  // only one answer per question, also from the keyboard
  const answering = useRef(false);
  // each new question takes the focus, so it is read
  const headingRef = useViewFocus(currentQuestion.id);

  useEffect(() => {
    answering.current = false;
    setFeedback("");
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
    if (answering.current) {
      return;
    }
    answering.current = true;
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

    if (isCorrect) {
      playSound(ganarFx);
    } else {
      playSound(perderFx);
    }

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

    const correctAnswer = answers.find((answer) => answer.id == correctAnswerId);
    const message = isCorrect
      ? t("correct")
      : t("incorrect").replace("{answer}", correctAnswer ? correctAnswer.title : "");
    setFeedback(message);
    announce(message);

    await delay(NEXT_QUESTION_DELAY_MS);

    setDisabledButtons(false);
    checkResult(isCorrect);
  };

  return (
    <main className="main-content h-100 is-relative">
      <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
        <div className="preguntes w-100">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="has-text-weight-semibold fs-14-24 is-flex is-align-items-center has-text-centered is-justify-content-center"
          >
            <span>
              <span className="is-sr-only">
                {t("question")} {levelCount} {t("of")} {levels.length}:{" "}
              </span>
              {currentQuestion.question}
            </span>
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
          <p className="preguntes__feedback has-text-weight-bold has-text-centered fs-20-24">
            {feedback}
          </p>
        </div>
      </div>
    </main>
  );
};

export default QuestionCard;
