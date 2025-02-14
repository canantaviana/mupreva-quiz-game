import { useEffect } from "react";
import useDedalo from "./hooks/useDedalo";

function App() {
  const { loading, fetchData } = useDedalo();

  useEffect(() => {
    const game_id = 2; // TODO: agafar game_id de la URL

    fetchData(game_id);
  }, [fetchData]);

  return <>{loading ? <p>Loading...</p> : <p>Data loaded!</p>}</>;
}

export default App;
