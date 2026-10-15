import { useState, useCallback } from "react";
import { getArCalls } from "../utils/getArCalls";
import { cleanData, cleanAnswers } from "../utils/cleanData";
import useGame from "@/hooks/useGame";

const API_URL =
  "https://dedalo.mupreva.org/dedalo6/publication/server_api/v1/json/";
const API_DB_NAME = "web_tangible_heritage";
const API_CODE = "lsi8wM5s$4KueñwkoPwgs";

function useDedalo() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);
  const { cheater } = useGame();

  const fetchData = async (body) => {
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
      // console.log(data);
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

  const fetchAnswers = useCallback(
    async (question, language) => {
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
      const cleanedAnswers = cleanAnswers(data);
      setCorrectAnswerId(cleanedAnswers.correct);

      if (cheater) {
        setAnswers(Object.values(cleanedAnswers.answers));
        return;
      }

      const randomAnswers = Object.values(cleanedAnswers.answers).sort(
        () => Math.random() - 0.5
      );
      setAnswers(randomAnswers);
    },
    [cheater]
  );

  return { data, loading, answers, correctAnswerId, fetchGame, fetchAnswers };
}

export default useDedalo;
