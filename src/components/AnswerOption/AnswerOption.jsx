const statusClassMap = {
  selected: "btn-seleccio",
  correct: "btn-encert",
  incorrect: "btn-errada",
};

const AnswerOption = ({ text, state, onClick, disabled }) => {
  return (
    <li style={disabled ? { pointerEvents: "none" } : null}>
      <button
        type="button"
        className={`
          ${statusClassMap[state] || ""}
          has-text-weight-semibold has-text-grey-darker has-text-left fs-14-20 is-flex is-align-items-center gap-4`}
        disabled={state === "disabled" ? true : false}
        onClick={onClick}
      >
        {text}
      </button>
    </li>
  );
};

export default AnswerOption;
