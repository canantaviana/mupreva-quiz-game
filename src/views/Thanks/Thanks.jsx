import { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import useGame from "@/hooks/useGame";
import useTranslations from "@/hooks/useTranslations";
import useViewFocus from "@/hooks/useViewFocus";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import fanfarriaFx from "@/assets/sounds/fanfarria.mp3"

// the result in words: win, wrong answer or time over (not only confetti and sound)
const resultKey = { win: "win", wrong: "lose_wrong", timeout: "lose_time" };

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Thanks = () => {
  const { levels, levelCount, win, endReason, gameUrlPath, title, language, playSound, stopSound } = useGame();
  const t = useTranslations();
  const { width, height } = useWindowSize();
  const headingRef = useViewFocus();
  const [showConfetti] = useState(() => win && !prefersReducedMotion());

  const result = resultKey[endReason] ? t(resultKey[endReason]) : t("thanks");
  useDocumentTitle([result, title[language]]);

  useEffect(() => {
    if (win) {
      playSound(fanfarriaFx);
    }
    // the fanfare stops when leaving this screen
    return () => stopSound();
  }, [win, playSound, stopSound]);

  return (
    <>
      {showConfetti && (
        // falls once and stops (WCAG 2.2.2); a canvas with no content for screen readers.
        // no aria-hidden wrapper: _base.scss hides [aria-hidden="true"] with display: none
        <Confetti width={width} height={height} recycle={false} numberOfPieces={400} />
      )}

      <main className="main-content h-100 is-relative">
        <div className="gracies wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
          <h1 className="has-text-white has-text-weight-bold fs-24-34 has-text-centered" ref={headingRef} tabIndex={-1}>
            {result}
          </h1>
          <p className="has-text-weight-bold fs-20-24 is-flex is-align-items-center has-text-centered">
            {t("level_reached")}: {levels[levelCount - 1].title}
          </p>
          <div className="has-text-white has-text-weight-semibold fs-20-24">{t("thanks")}</div>
          <div className="has-text-centered">
            <a href={gameUrlPath} className="button button--lg">
              {t("play_again")}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Thanks;
