import comodi1 from "@/assets/img/comodi-1.svg";
import comodi2 from "@/assets/img/comodi-2.svg";
import comodi3 from "@/assets/img/comodi-3.svg";
import useGame from "@/hooks/useGame";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import useTranslations from "@/hooks/useTranslations";

const GameHeader = ({
  count,
  total,
  timeLimit,
  timeUsed,
  useTime,
  fiftyUsed,
  useFifty,
  audienceWildcardUsed,
  useAudienceWildcard,
  showStats,
}) => {
  const { levelCount, levels, title, language, disabledButtons } = useGame();
  const t = useTranslations();

  // name of a wildcard, saying when it was already used
  const wildcardName = (key, used) =>
    used ? `${t(key)} (${t("wildcard_used")})` : t(key);

  return (
    <header
      className="is-relative"
      style={disabledButtons ? { pointerEvents: "none" } : null}
    >
      <h1 className="is-sr-only">{title[language]}</h1>
      <div className="wrapper">
        <div className="is-flex is-justify-content-space-between is-align-items-center py-5">
          <span className="has-text-weight-semibold fs-14-18">
            <span className="has-text-primary">
              {t("level")} {levelCount}/
            </span>
            {levels.length}
          </span>
          {timeLimit && (
            // the seconds left (warnings at 10 and 5 s are announced from Game)
            <div className="is-flex is-align-items-center gap-2" role="timer" aria-label={t("time_remaining")}>
              <div
                id="counter"
                className={`counter-text has-text-weight-bold fs-30-44 ${
                  count > 5 ? "has-text-primary" : ""
                }`}
                style={{ color: count > 5 ? "#b292b8" : "red" }}
              >
                {count}
              </div>
              <ProgressCircle count={count} total={total} />
            </div>
          )}
        </div>
        <div className="is-flex gap-5 is-align-items-center is-justify-content-center py-4">
          <span className="has-text-weight-semibold has-text-primary fs-12-18" id="wildcards-label">
            {t("wildcards")}:
          </span>
          <ul className="comodins is-flex gap-4" aria-labelledby="wildcards-label">
            <li>
              <button
                type="button"
                onClick={useFifty}
                disabled={fiftyUsed}
                aria-disabled={disabledButtons ? "true" : undefined}
              >
                <img
                  src={comodi1}
                  width="37"
                  height="10"
                  alt={wildcardName("fiftyWildcard", fiftyUsed)}
                />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={useAudienceWildcard}
                className={showStats ? "active" : ""}
                disabled={audienceWildcardUsed && !showStats}
                aria-disabled={disabledButtons || showStats ? "true" : undefined}
              >
                <img
                  src={comodi2}
                  width="33"
                  height="17"
                  alt={wildcardName("audienceWildcard", audienceWildcardUsed)}
                />
              </button>
            </li>
            {timeLimit && (
              <li>
                <button
                  type="button"
                  onClick={useTime}
                  disabled={timeUsed}
                  aria-disabled={disabledButtons ? "true" : undefined}
                >
                  <img
                    src={comodi3}
                    width="25"
                    height="29"
                    alt={wildcardName("timeWildcard", timeUsed)}
                  />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
