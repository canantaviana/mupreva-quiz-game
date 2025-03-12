import { useEffect } from "react";
import useDedalo from "./hooks/useDedalo";
import useGame from "./hooks/useGame";
import ViewManager from "./views/ViewManager/ViewManager";

function App() {
  const { fetchGame, loading, data } = useDedalo();
  const { setGameUrlPath, setCheater, setGameId } = useGame();

  useEffect(() => {
    setGameUrlPath(window.location.pathname);
    const urlPath = window.location.pathname
      .split("/")
      .filter((segment) => segment !== "");

    // if (urlPath.includes("cheat")) {
    //   setCheater(true);
    //   urlPath.splice(urlPath.indexOf("cheat"), 1);
    // }
    const game_id = urlPath[urlPath.length - 1];
    setGameId(game_id);

    fetchGame(game_id);
  }, [fetchGame, setGameUrlPath, setGameId, setCheater]);

  if (loading) {
    return (
      <main className="main-content h-100 is-relative">
        <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          <p className="loading has-text-weight-bold is-size-3 has-text-white">
            Carregant
          </p>
        </div>
      </main>
    );
  }

  return data ? <ViewManager gameData={data} /> : null;
}

export default App;
