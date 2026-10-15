import { useCallback, useEffect, useRef, useState } from "react";
import { GameContext } from "./GameContext";

const MUTED_STORAGE_KEY = "mupreva_game_muted";

// lang attribute for each game language
const LANG_CODES = { vlca: "ca", spa: "es" };

const readMuted = () => {
  try {
    return localStorage.getItem(MUTED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const GameProvider = ({ children }) => {
  const [currentView, setCurrentViewState] = useState("intro");
  const [language, setLanguage] = useState("vlca");
  const [levels, setLevels] = useState([]);
  const [levelCount, setLevelCount] = useState(1);
  const [title, setTitle] = useState({});
  const [win, setWin] = useState(false);
  // why the game ended: "win", "wrong" (wrong answer) or "timeout"
  const [endReason, setEndReason] = useState(null);
  const [gameUrlPath, setGameUrlPath] = useState("");
  const [cheater, setCheater] = useState(false);
  const [gameId, setGameId] = useState("");
  const [disabledButtons, setDisabledButtons] = useState(false);
  // false: no time limit per question (WCAG 2.2.1)
  const [timeLimit, setTimeLimit] = useState(true);
  const [muted, setMutedState] = useState(readMuted);
  const [announcement, setAnnouncement] = useState("");

  // after the first view change, each new view takes the keyboard focus
  const hasNavigated = useRef(false);
  const setCurrentView = useCallback((view) => {
    hasNavigated.current = true;
    setCurrentViewState(view);
  }, []);

  // the page is read in the language being played
  useEffect(() => {
    document.documentElement.lang = LANG_CODES[language] || "ca";
  }, [language]);

  // sounds: one at a time, and none when muted
  const currentAudio = useRef(null);
  const stopSound = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
  }, []);
  const mutedRef = useRef(muted);
  const setMuted = useCallback(
    (value) => {
      mutedRef.current = value;
      setMutedState(value);
      try {
        localStorage.setItem(MUTED_STORAGE_KEY, value ? "1" : "0");
      } catch {
        // storage not available: the choice lasts for this visit only
      }
      if (value) {
        stopSound();
      }
    },
    [stopSound]
  );
  const playSound = useCallback(
    (fx) => {
      stopSound();
      if (mutedRef.current) {
        return;
      }
      const audio = new Audio(fx);
      audio.preload = "auto";
      audio.volume = 0.5;
      currentAudio.current = audio;
      audio.play().catch((error) => console.log("Autoplay blocked:", error));
    },
    [stopSound]
  );

  // status messages for screen readers (one live region, see App)
  const announce = useCallback((message) => {
    setAnnouncement("");
    setTimeout(() => setAnnouncement(message), 100);
  }, []);

  return (
    <GameContext.Provider
      value={{
        currentView,
        setCurrentView,
        hasNavigated,
        language,
        setLanguage,
        levels,
        setLevels,
        levelCount,
        setLevelCount,
        title,
        setTitle,
        win,
        setWin,
        endReason,
        setEndReason,
        gameUrlPath,
        setGameUrlPath,
        cheater,
        setCheater,
        gameId,
        setGameId,
        disabledButtons,
        setDisabledButtons,
        timeLimit,
        setTimeLimit,
        muted,
        setMuted,
        playSound,
        stopSound,
        announcement,
        announce,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
