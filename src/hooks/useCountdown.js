import { useState, useEffect, useCallback } from "react";

const useCountdown = (initialCount, onFinish) => {
  const [count, setCount] = useState(initialCount);
  const [total, setTotal] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        if (count === 1 && onFinish) onFinish();

        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count, onFinish]);

  const addTime = (time) => {
    setCount((prevCount) => prevCount + time);
    setTotal((prevTotal) => prevTotal + time);
  };

  const resetTime = useCallback(() => {
    setCount(initialCount);
    setTotal(initialCount);
  }, [initialCount, setCount, setTotal]);

  return { count, total, addTime, resetTime };
};

export default useCountdown;
