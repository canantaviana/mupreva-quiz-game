import { useEffect, useState } from "react";
import useTranslations from "@/hooks/useTranslations";
import data_io from "@/utils/data_io";
import useGame from "@/hooks/useGame";
import useViewFocus from "@/hooks/useViewFocus";

const PlayerStats = ({ setShowStats, questionId, answers }) => {
  const { gameId } = useGame();
  const t = useTranslations();
  const [stats, setStats] = useState(null);
  // the chart replaces the question: take the focus to it
  const headingRef = useViewFocus(stats ? "ready" : "loading");

  useEffect(() => {
    const getStats = async () => {
      // if the request fails, show 0% and the OK button instead of an empty screen
      let playerAnswers = [];
      try {
        const result = await data_io.obtener_respuesta(questionId, gameId);
        if (Array.isArray(result)) {
          playerAnswers = result;
        }
      } catch (error) {
        console.error(error);
      }
      const answerIds = answers.map((answer) => Number(answer.id));
      const answerCounts = [0, 0, 0, 0];
      // whole percentages (no "7.000000000000001%", and 0 when nobody answered yet)
      const answerPercentages = [0, 0, 0, 0];

      // contar vegades que s'ha triat cada resposta
      playerAnswers.forEach((answer) => {
        const index = answerIds.indexOf(answer);
        if (index !== -1) {
          answerCounts[index]++;
        }
      });

      // calcular percentatges
      for (let i = 0; i < 4; i++) {
        answerPercentages[i] = playerAnswers.length
          ? Math.round((answerCounts[i] / playerAnswers.length) * 100)
          : 0;
      }

      setStats({
        a: answerPercentages[0],
        b: answerPercentages[1],
        c: answerPercentages[2],
        d: answerPercentages[3],
      });
    };

    getStats();
  }, [answers, gameId, questionId]);

  if (!stats) {
    return null;
  }

  return (
    <main className="main-content h-100 is-relative">
      <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
        <div className="grafica">
          <h2 className="is-sr-only" ref={headingRef} tabIndex={-1}>{t("stats-sr-description")}</h2>
          <ol className="grafica__list">
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.a / 10 + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} A: </span>
                {stats.a}%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.b / 10 + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} B: </span>
                {stats.b}%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.c / 10 + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} C: </span>
                {stats.c}%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.d / 10 + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} D: </span>
                {stats.d}%
              </span>
            </li>
          </ol>
          <div className="has-text-centered">
            <button
              type="button"
              onClick={() => setShowStats(false)}
              className="button button--lg"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayerStats;
