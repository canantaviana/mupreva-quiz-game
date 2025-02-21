import useGame from "@/hooks/useGame";
import useCountdown from "../../hooks/useCountdown";

const GameCountdown = () => {
  const { setCurrentView } = useGame();
  const { count } = useCountdown(3, () => setCurrentView("game"));

  return (
    <main className="main-content h-100 is-relative">
      <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
        <span className="counter">
          <p className="has-text-white link-dn">{count}</p>
        </span>
      </div>
    </main>
  );
};

export default GameCountdown;
