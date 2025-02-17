import { useEffect } from "react";
import useDedalo from "./hooks/useDedalo";
import Game from "./views/Game/Game";

function App() {
  const { fetchData, loading, data } = useDedalo();

  useEffect(() => {
    const game_id = 2; // TODO: agafar game_id de la URL

    fetchData(game_id);
  }, [fetchData]);

  if (loading) {
    return (
      <main className="main-content h-100 is-relative">
        <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          <p className="loading has-text-weight-bold is-size-3">
            <a href="/intro/" className="has-text-white link-dn">
              Carregant
            </a>
          </p>
        </div>
      </main>
    );
  }

  return data ? <Game data={data} /> : null;
}

export default App;
