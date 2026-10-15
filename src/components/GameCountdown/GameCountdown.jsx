import { useEffect } from "react";
import useGame from "@/hooks/useGame";
import useCountdown from "../../hooks/useCountdown";
import useTranslations from "@/hooks/useTranslations";
import useViewFocus from "@/hooks/useViewFocus";
import inicioFx from "@/assets/sounds/inicio.mp3"

const GameCountdown = () => {
  const { setCurrentView, playSound } = useGame();
  const t = useTranslations();
  const { count } = useCountdown(3, () => setCurrentView("game"));
  const focusRef = useViewFocus();

  useEffect(() => {
    playSound(inicioFx);
  }, [playSound]);

  return (
    <main className="main-content h-100 is-relative">
      <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
        {/* read once; the changing digits are not a live region, so they are not announced */}
        <p className="is-sr-only" ref={focusRef} tabIndex={-1}>
          {t("countdown")}
        </p>
        {/* no aria-hidden: _base.scss hides [aria-hidden="true"] with display: none */}
        <span className="counter">
          <p className="has-text-white link-dn">{count}</p>
        </span>
      </div>
    </main>
  );
};

export default GameCountdown;
