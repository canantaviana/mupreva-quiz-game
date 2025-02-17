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
      console.log(data);

      const cleanedData = cleanData(data);

      setData(cleanedData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  function cleanData(rawData) {
    const gameData = {
      backgroundImage: { default: "images/plato3.jpg" },
      creditsImage: { default: "images/creditos.jpg" },
      questions: { default: {} },
      levels: { default: [] },
      title: { default: "Mupreva" },
      startingLevel: {},
    };

    const result = rawData.result;

    if (!result || result.length != 2) {
      return null;
    }

    result.forEach((langElement) => {
      const lang = langElement.id;
      const { children_data, images_data, title } = langElement.result[0];

      gameData.title[lang] = title;

      images_data.forEach((imgElement) => {
        if (imgElement.title === "fondo") {
          gameData.backgroundImage[lang] = imgElement.image;
        } else if (imgElement.title === "creditos") {
          gameData.creditsImage[lang] = imgElement.image;
        }
      });

      gameData.questions[lang] = {};

      gameData.levels[lang] = children_data
        .filter((levelElement) => levelElement.type_data === '["2"]')
        .map((levelElement) => {
          gameData.questions[lang][levelElement.section_id] =
            levelElement.children_data
              .filter(
                (questionElement) => questionElement.type_data === '["3"]'
              )
              .map((questionElement) => {
                return {
                  question: questionElement.title,
                  id: questionElement.section_id,
                };
              });
          return {
            title: levelElement.title,
            id: levelElement.section_id,
          };
        });

      gameData.startingLevel[lang] = gameData.levels[lang][0].id;
    });

    return gameData;
  }

  return { data, loading, fetchData };
}

export default useDedalo;
