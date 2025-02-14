import { useState, useCallback } from "react";

import { getArCalls } from "../utils/getArCalls";

const API_URL =
  "https://pre-dedalo.mupreva.org/dedalo6-pre/publication/server_api/v1/json/";
const API_DB_NAME = "web_tangible_heritage";
const API_CODE = "lsi8wM5s$4KueñwkoPwgs";

function useDedalo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (game_id) => {
    setLoading(true);

    const body = {
      dedalo_get: "combi",
      db_name: API_DB_NAME,
      code: API_CODE,
      ar_calls: JSON.stringify(getArCalls(game_id)),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      const cleanedData = cleanData(data);
      console.log(cleanedData);

      setData(cleanedData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  function cleanData(rawData) {
    // TODO: organitzar les dades rebudes
    return rawData;
  }

  return { data, loading, fetchData };
}

export default useDedalo;
