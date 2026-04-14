import { useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import useGame from "@/hooks/useGame";
import useTranslations from "@/hooks/useTranslations";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import fanfarriaFx from "@/assets/sounds/fanfarria.mp3"

const Thanks = ({ playSound }) => {
  const { levels, levelCount, win, gameUrlPath } = useGame();
  const t = useTranslations();
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (win) {
      playSound(fanfarriaFx);
    }
  }, [win, playSound]);

  return (
    <>
      {win && <Confetti width={width} height={height} />}

      <main className="main-content h-100 is-relative">
        <div className="gracies wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
          <h1 className="has-text-white has-text-weight-bold fs-24-34">
            {t("thanks")}
          </h1>
          <p className="has-text-weight-bold fs-20-24 is-flex is-align-items-center has-text-centered">
            {t("level")}: {levels[levelCount - 1].title}
          </p>
          <div className="has-text-centered">
            <a href={gameUrlPath} className="button button--lg">
              OK
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Thanks;
