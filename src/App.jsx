import { useEffect } from "react";
import useDedalo from "./hooks/useDedalo";
import useGame from "./hooks/useGame";
import ViewManager from "./views/ViewManager/ViewManager";

function App() {
  const { fetchGame, loading, data } = useDedalo();
  const { setGameUrlPath, setCheater, setGameId, announcement } = useGame();

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

  // status messages (answers, time left…) read by screen readers; always in the page
  const statusRegion = (
    <div className="is-sr-only" role="status">
      {announcement}
    </div>
  );

  if (loading) {
    return (
      <main className="main-content h-100 is-relative">
        <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          <p className="loading has-text-weight-bold is-size-3 has-text-white" role="status">
            <span lang="ca">Carregant</span> / <span lang="es">Cargando</span>
          </p>
        </div>
      </main>
    );
  }

  if (!data) {
    // the game could not be loaded: say so instead of a blank page
    return (
      <main className="main-content h-100 is-relative">
        <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l has-text-centered">
          <p className="has-text-weight-bold is-size-4 has-text-white" role="alert">
            <span lang="ca">No s&apos;ha pogut carregar el joc. Torneu-ho a provar més tard.</span>
            <br />
            <span lang="es">No se ha podido cargar el juego. Vuelvan a intentarlo más tarde.</span>
          </p>
          <a href="https://mupreva.org/" className="button">
            Museu de Prehistòria de València
          </a>
        </div>
      </main>
    );
  }

  return (
    <>
      {statusRegion}
      <ViewManager gameData={data} />
    </>
  );
}

export default App;
