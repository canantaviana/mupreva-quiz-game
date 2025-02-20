import AnswerOption from "../AnswerOption/AnswerOption";

const QuestionCard = ({
  currentQuestion,
  answers,
  correctAnswerId,
  checkResult,
}) => {
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
                answer={answer}
                correctAnswerId={correctAnswerId}
                evaluate={checkResult}
              />
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
};

export default QuestionCard;
