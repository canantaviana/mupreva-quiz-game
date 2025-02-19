import { useState } from "react";

const QuestionCard = ({ currentQuestion, answers, correctAnswerId }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(
    answers.reduce((acc, item) => {
      acc[item.id] = "";
      return acc;
    }, {})
  );

  const handleClick = (id) => {
    setAnswerStatus((prev) => ({ ...prev, [id]: "selected" }));
    setIsDisabled(true);
    setTimeout(() => {
      setAnswerStatus((prev) => ({
        ...prev,
        [id]: id === correctAnswerId ? "correct" : "incorrect",
      }));
      setIsDisabled(false);
      setAnswerStatus((prev) => ({ ...prev, [correctAnswerId]: "correct" }));
    }, 1250);
  };

  return (
    <main className="main-content h-100 is-relative">
      <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
        <div className="preguntes w-100">
          <h2 className="has-text-weight-semibold fs-14-24 is-flex is-align-items-center has-text-centered is-justify-content-center">
            {currentQuestion.question}
          </h2>
          <ol className="preguntes__list">
            {answers.map((answer) => {
              const status = answerStatus[answer.id];
              const statusClassMap = {
                selected: "btn-seleccio",
                correct: "btn-encert",
                incorrect: "btn-errada",
              };
              const newClass = statusClassMap[status] || "";

              return (
                <li
                  key={answer.id}
                  style={isDisabled ? { pointerEvents: "none" } : null}
                >
                  <button
                    type="button"
                    className={`${newClass} has-text-weight-semibold has-text-grey-darker has-text-left fs-14-20 is-flex is-align-items-center gap-4`}
                    disabled={
                      answerStatus[answer.id] === "disabled" ? true : false
                    }
                    onClick={() => handleClick(answer.id)}
                  >
                    {answer.title}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </main>
  );
};

export default QuestionCard;
