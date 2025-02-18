import useCountdown from "../../hooks/useCountdown";

const GameCountdown = ({ action }) => {
  const count = useCountdown(3, action);

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
