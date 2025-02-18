import { useState, useCallback } from "react";
import { getArCalls } from "../utils/getArCalls";
import { cleanData, cleanAnswers } from "../utils/cleanData";

const API_URL =
  "https://pre-dedalo.mupreva.org/dedalo6-pre/publication/server_api/v1/json/";
const API_DB_NAME = "web_tangible_heritage";
const API_CODE = "lsi8wM5s$4KueñwkoPwgs";

function useDedalo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (body) => {
    setLoading(true);

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
      console.log(data);
      return data;
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGame = useCallback(async (game_id) => {
    const body = {
      dedalo_get: "combi",
      db_name: API_DB_NAME,
      code: API_CODE,
      ar_calls: JSON.stringify(getArCalls(game_id)),
    };

    const data = await fetchData(body);
    const cleanedData = cleanData(data);
    setData(cleanedData);
  }, []);

  const fetchQuestion = async (question, language) => {
    const body = {
      dedalo_get: "records",
      db_name: API_DB_NAME,
      code: API_CODE,
      table: "game",
      ar_fields: ["section_id", "type_data", "title"],
      lang: "lg-" + language,
      sql_filter: 'parent_data like "%\\"' + question.id + '\\"%"',
    };

    const data = await fetchData(body);
    const cleanedData = cleanAnswers(data);
    setData(cleanedData);
  };

  return { data, loading, fetchGame, fetchQuestion };
}

export default useDedalo;
