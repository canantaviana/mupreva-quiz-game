import useTranslations from "@/hooks/useTranslations";

const statusClassMap = {
  selected: "btn-seleccio",
  correct: "btn-encert",
  incorrect: "btn-errada",
};

// the state of an answer in words, not only colours (WCAG 1.4.1)
const statusTextMap = {
  selected: "your_answer",
  correct: "correct_answer",
  incorrect: "wrong_answer",
};

const AnswerOption = ({ text, state, onClick, disabled }) => {
  const t = useTranslations();

  return (
    <li style={disabled ? { pointerEvents: "none" } : null}>
      <button
        type="button"
        className={`
          ${statusClassMap[state] || ""}
          has-text-weight-semibold has-text-grey-darker has-text-left fs-14-20 is-flex is-align-items-center gap-4`}
        disabled={state === "disabled" ? true : false}
        // while an answer is being resolved the buttons keep the focus but do nothing
        aria-disabled={disabled ? "true" : undefined}
        onClick={disabled ? undefined : onClick}
      >
        <span>
          {text}
          {statusTextMap[state] && (
            <span className="is-sr-only"> ({t(statusTextMap[state])})</span>
          )}
        </span>
      </button>
    </li>
  );
};

export default AnswerOption;
