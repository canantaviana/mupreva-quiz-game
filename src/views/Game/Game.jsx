import { useEffect, useState } from "react";
import useDedalo from "@/hooks/useDedalo";
import useGame from "@/hooks/useGame";
import useCountdown from "@/hooks/useCountdown";
import useTranslations from "@/hooks/useTranslations";
import useDocumentTitle from "@/hooks/useDocumentTitle";

import GameHeader from "@/components/GameHeader/GameHeader";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import PlayerStats from "@/components/PlayerStats/PlayerStats";

import seleccionFx from "@/assets/sounds/seleccion.mp3"
import perderFx from "@/assets/sounds/perder.mp3"

// seconds left when screen reader users are warned
const TIME_WARNINGS = [10, 5];

const Game = ({ questions }) => {
  const { answers, correctAnswerId, loading, fetchAnswers } = useDedalo();
  const {
    setCurrentView,
    language,
    levels,
    levelCount,
    setLevelCount,
    setWin,
    setEndReason,
    title,
    timeLimit,
    disabledButtons,
    playSound,
    announce,
  } = useGame();
  const t = useTranslations();
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[levels[0].id]
  );
  const [hintIds, setHintIds] = useState([]);
  const [timeWildcardUsed, setTimeWildcardUsed] = useState(false);
  const [fiftyWildcardUsed, setFiftyWildcardUsed] = useState(false);
  const [audienceWildcardUsed, setAudienceWildcardUsed] = useState(false);
  const [showStats, setShowStats] = useState(false);
  // the time stops while the result of an answer or the audience wildcard is shown
  const { count, total, addTime, resetTime } = useCountdown(30, onTimeUp, {
    enabled: timeLimit,
    paused: disabledButtons || showStats,
  });

  useDocumentTitle([
    `${t("question")} ${levelCount} ${t("of")} ${levels.length}`,
    title[language],
  ]);

  useEffect(() => {
    fetchAnswers(currentQuestion, language);
    resetTime();
  }, [fetchAnswers, currentQuestion, language, resetTime]);

  // warn before the time runs out (the visible counter is not read every second)
  useEffect(() => {
    if (timeLimit && TIME_WARNINGS.includes(count)) {
      announce(t("time_left").replace("{n}", count));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, timeLimit]);

  function onTimeUp() {
    setEndReason("timeout");
    setCurrentView("thanks");
    playSound(perderFx);
  }

  // wildcards can't be used while an answer is being resolved (also from the keyboard)
  function useTimeWildcard() {
    if (disabledButtons || timeWildcardUsed) return;
    addTime(30);
    setTimeWildcardUsed(true);
    playSound(seleccionFx);
  }

  function useFiftyWildcard() {
    if (disabledButtons || fiftyWildcardUsed) return;
    setFiftyWildcardUsed(true);
    disableHalfAnswers();
    playSound(seleccionFx);
  }

  function useAudienceWildcard() {
    if (disabledButtons || audienceWildcardUsed) return;
    setAudienceWildcardUsed(true);
    setShowStats(true);
    playSound(seleccionFx);
  }

  function checkResult(isCorrect) {
    if (isCorrect) {
      if (levelCount === levels.length) {
        setWin(true);
        setEndReason("win");
        setCurrentView("thanks");
        return;
      }
      setCurrentQuestion(questions[levels[levelCount].id]);
      setLevelCount((prev) => prev + 1);
    } else {
      setEndReason("wrong");
      setCurrentView("thanks");
    }
  }

  function disableHalfAnswers() {
    const wrongAnswersIds = answers
      .map((answer) => answer.id)
      .filter((id) => id !== correctAnswerId);
    const randomIndex = Math.floor(Math.random() * wrongAnswersIds.length);
    wrongAnswersIds.splice(randomIndex, 1);
    setHintIds(wrongAnswersIds);
  }

  if (loading) return null;

  return (
    <>
      <GameHeader
        count={count}
        total={total}
        timeLimit={timeLimit}
        timeUsed={timeWildcardUsed}
        useTime={useTimeWildcard}
        fiftyUsed={fiftyWildcardUsed}
        useFifty={useFiftyWildcard}
        audienceWildcardUsed={audienceWildcardUsed}
        useAudienceWildcard={useAudienceWildcard}
        showStats={showStats}
      />
      {showStats ? (
        <PlayerStats
          questionId={currentQuestion.id}
          answers={answers}
          setShowStats={setShowStats}
        />
      ) : (
        <QuestionCard
          currentQuestion={currentQuestion}
          answers={answers}
          correctAnswerId={correctAnswerId}
          checkResult={checkResult}
          hintIds={hintIds}
        />
      )}
    </>
  );
};

export default Game;
