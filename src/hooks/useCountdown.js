import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Countdown in seconds.
 * - enabled: false turns the time limit off (count stays at initialCount, onFinish never runs)
 * - paused: the time stops while true (answer result, audience wildcard) and goes on afterwards
 */
const useCountdown = (initialCount, onFinish, { enabled = true, paused = false } = {}) => {
  const [count, setCount] = useState(initialCount);
  const [total, setTotal] = useState(initialCount);
  const startTimeRef = useRef(Date.now());
  const endTimeRef = useRef(Date.now() + initialCount * 1000);
  // remaining milliseconds when the countdown was paused
  const pausedRemainingRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (paused) {
      if (pausedRemainingRef.current === null) {
        pausedRemainingRef.current = Math.max(0, endTimeRef.current - Date.now());
      }
      return;
    }
    if (pausedRemainingRef.current !== null) {
      endTimeRef.current = Date.now() + pausedRemainingRef.current;
      pausedRemainingRef.current = null;
    }

    const updateCount = () => {
      const now = Date.now();
      const remainingTime = Math.max(
        0,
        Math.round((endTimeRef.current - now) / 1000)
      );
      setCount(remainingTime);

      if (remainingTime === 0 && onFinish) {
        onFinish();
      }
    };

    updateCount();
    const timer = setInterval(updateCount, 1000);
    return () => clearInterval(timer);
  }, [onFinish, enabled, paused]);

  const addTime = (time) => {
    setTotal((prevTotal) => prevTotal + time);
    if (pausedRemainingRef.current !== null) {
      pausedRemainingRef.current += time * 1000;
    } else {
      endTimeRef.current += time * 1000;
    }
    setCount((prevCount) => prevCount + time);
  };

  const resetTime = useCallback(() => {
    const now = Date.now();
    startTimeRef.current = now;
    endTimeRef.current = now + initialCount * 1000;
    pausedRemainingRef.current = null;
    setCount(initialCount);
    setTotal(initialCount);
  }, [initialCount]);

  return { count, total, addTime, resetTime };
};

export default useCountdown;
