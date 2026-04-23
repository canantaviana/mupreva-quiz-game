import { useEffect, useState } from "react";
import useTranslations from "@/hooks/useTranslations";
import data_io from "@/utils/data_io";
import useGame from "@/hooks/useGame";

const PlayerStats = ({ setShowStats, questionId, answers }) => {
  const { gameId } = useGame();
  const t = useTranslations();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      const playerAnswers = await data_io.obtener_respuesta(questionId, gameId);
      const answerIds = answers.map((answer) => Number(answer.id));
      const answerCounts = [0, 0, 0, 0];
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
        answerPercentages[i] = (
          (answerCounts[i] / playerAnswers.length) *
          10
        ).toFixed(1);
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
          <h2 className="is-sr-only">{t("stats-sr-description")}</h2>
          <ol className="grafica__list">
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.a + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} A: </span>
                {Number(stats.a) * 10}%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.b + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} B: </span>
                {Number(stats.b) * 10}%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.c + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} C: </span>
                {Number(stats.c) * 10}%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.d + "rem" }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">{t("answer")} D: </span>
                {Number(stats.d) * 10}%
              </span>
            </li>
          </ol>
          <div className="has-text-centered">
            <a
              onClick={() => setShowStats(false)}
              className="button button--lg"
              href="#"
            >
              OK
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlayerStats;
