const AnswerOption = ({ text, state, action }) => {
  const stateClassMap = {
    selected: "btn-seleccio",
    correct: "btn-encert",
    incorrect: "btn-errada",
  };
  const newClass = stateClassMap[state] || "";

  return (
    <li>
      <button
        type="button"
        className={`${newClass} has-text-weight-semibold has-text-grey-darker has-text-left fs-14-20 is-flex is-align-items-center gap-4`}
        disabled={state === "disabled" ? true : false}
        onClick={() => action()}
      >
        {text}
      </button>
    </li>
  );
};

export default AnswerOption;
