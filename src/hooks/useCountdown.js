import { useState, useEffect } from "react";

const useCountdown = (initialCount, onFinish) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        if (count === 1 && onFinish) onFinish();

        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count, onFinish]);

  return count;
};

export default useCountdown;
