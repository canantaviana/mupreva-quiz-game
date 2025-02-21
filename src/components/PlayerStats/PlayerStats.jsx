const PlayerStats = ({ setShowStats }) => {
  const stats = {
    a: "1.2rem",
    b: "2.8rem",
    c: "2.2rem",
    d: "3.8rem",
  };
  return (
    <main className="main-content h-100 is-relative">
      <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
        <div className="grafica">
          <h2 className="is-sr-only">Percentatge per cada resposta</h2>
          <ol className="grafica__list">
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.a }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">Resposta A: </span>12%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.b }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">Resposta B: </span>28%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.c }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">Resposta C: </span>22%
              </span>
            </li>
            <li>
              <div
                className="has-background-primary"
                style={{ height: stats.d }}
              ></div>
              <span className="has-text-weight-white has-text-weight-bold has-text-centered">
                <span className="is-sr-only">Resposta D: </span>38%
              </span>
            </li>
          </ol>
          <div className="has-text-centered">
            <a
              onClick={() => setShowStats(false)}
              className="button button--lg"
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
