import { useState, useEffect } from "react";
import useGame from "@/hooks/useGame";

const AnswerOption = ({ answer, correctAnswerId, evaluate }) => {
  const [status, setStatus] = useState("");
  const { disabledButtons, setDisabledButtons, isRevealed, setIsRevealed } =
    useGame();

  const statusClassMap = {
    selected: "btn-seleccio",
    correct: "btn-encert",
    incorrect: "btn-errada",
  };

  const handleClick = (id) => {
    const isCorrect = id === correctAnswerId;
    setStatus("selected");
    setDisabledButtons(true);

    const timedReveal = () => {
      setStatus(isCorrect ? "correct" : "incorrect");
      if (!isCorrect) setIsRevealed(true);
      setTimeout(() => evaluate(isCorrect), 1250);
    };
    setTimeout(timedReveal, 1250);
  };

  useEffect(() => {
    if (answer.id === correctAnswerId && isRevealed) {
      setStatus("correct");
    }
  }, [isRevealed, answer.id, correctAnswerId]);

  return (
    <li
      key={answer.id}
      style={disabledButtons ? { pointerEvents: "none" } : null}
    >
      <button
        type="button"
        className={`${
          statusClassMap[status] || ""
        } has-text-weight-semibold has-text-grey-darker has-text-left fs-14-20 is-flex is-align-items-center gap-4`}
        disabled={status === "disabled" ? true : false}
        onClick={() => handleClick(answer.id)}
      >
        {answer.title}
      </button>
    </li>
  );
};

export default AnswerOption;
