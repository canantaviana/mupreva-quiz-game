import { useEffect } from "react";
import useDedalo from "./hooks/useDedalo";
import ViewManager from "./views/ViewManager/ViewManager";

function App() {
  const { fetchGame, loading, data } = useDedalo();

  useEffect(() => {
    const game_id = 2; // TODO: agafar game_id de la URL

    fetchGame(game_id);
  }, [fetchGame]);

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

  return data ? <ViewManager gameData={data} /> : null;
}

export default App;
