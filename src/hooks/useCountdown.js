import { useState, useEffect, useCallback, useRef } from "react";

const useCountdown = (initialCount, onFinish) => {
  const [count, setCount] = useState(initialCount);
  const [total, setTotal] = useState(initialCount);
  const startTimeRef = useRef(Date.now());
  const endTimeRef = useRef(Date.now() + initialCount * 1000);

  useEffect(() => {
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
  }, [onFinish]);

  const addTime = (time) => {
    setTotal((prevTotal) => prevTotal + time);
    endTimeRef.current += time * 1000;
    setCount((prevCount) => prevCount + time);
  };

  const resetTime = useCallback(() => {
    const now = Date.now();
    startTimeRef.current = now;
    endTimeRef.current = now + initialCount * 1000;
    setCount(initialCount);
    setTotal(initialCount);
  }, [initialCount]);

  return { count, total, addTime, resetTime };
};

export default useCountdown;
