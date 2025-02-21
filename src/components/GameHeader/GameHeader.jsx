import comodi1 from "@/assets/img/comodi-1.svg";
import comodi2 from "@/assets/img/comodi-2.svg";
import comodi3 from "@/assets/img/comodi-3.svg";
import useGame from "@/hooks/useGame";
import ProgressCircle from "../ProgressCircle/ProgressCircle";

const GameHeader = ({ count, timeUsed, useTime, fiftyUsed, useFifty }) => {
  const { levelCount, levels } = useGame();

  return (
    <header className="is-relative">
      <h1 className="is-sr-only">Monedes antigues de la Península Ibèrica</h1>
      <div className="wrapper">
        <div className="is-flex is-justify-content-space-between is-align-items-center py-5">
          <span className="has-text-weight-semibold fs-14-18">
            <span className="has-text-primary">Nivell {levelCount}/</span>
            {levels.length}
          </span>
          <div className="is-flex is-align-items-center gap-2">
            <div
              id="counter"
              className="counter-text has-text-primary has-text-weight-bold fs-30-44"
            >
              {count}
            </div>
            <ProgressCircle count={count} />
          </div>
        </div>
        <div className="is-flex gap-5 is-align-items-center is-justify-content-center py-4">
          <span className="has-text-weight-semibold has-text-primary fs-12-18">
            Comodins:
          </span>
          <ul className="comodins is-flex gap-4">
            <li>
              <button type="button" onClick={useFifty} disabled={fiftyUsed}>
                <img
                  src={comodi1}
                  width="37"
                  height="10"
                  alt="Comodí del 50%"
                />
              </button>
            </li>
            <li>
              <button type="button">
                <img
                  src={comodi2}
                  width="33"
                  height="17"
                  alt="Comodí del públic"
                />
              </button>
            </li>
            <li>
              <button type="button" onClick={useTime} disabled={timeUsed}>
                <img
                  src={comodi3}
                  width="25"
                  height="29"
                  alt="Comodí del temps"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
