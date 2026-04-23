import { useState, useEffect } from "react";
import vlca from "@/translations/vlca.json";
import spa from "@/translations/spa.json";
import useGame from "./useGame";

const translationsMap = { vlca, spa };

const useTranslations = (lang) => {
  const { language } = useGame();

  const languageToUse = lang || language;

  const [translations, setTranslations] = useState({});

  useEffect(() => {
    setTranslations(translationsMap[languageToUse] || {});
  }, [languageToUse]);

  const t = (key) => {
    return translations[key] || key;
  };

  return t;
};

export default useTranslations;
