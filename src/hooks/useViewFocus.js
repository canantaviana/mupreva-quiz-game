import { useEffect, useRef } from "react";
import useGame from "./useGame";

/**
 * Moves the keyboard focus to the element (usually the view heading) when the
 * view is shown, so screen reader users know the screen changed (WCAG 2.4.3).
 * Not on the first page load: there the browser starts at the top as usual.
 * `key` lets a view move the focus again when its content changes (next question).
 */
const useViewFocus = (key) => {
  const ref = useRef(null);
  const { hasNavigated } = useGame();

  useEffect(() => {
    if (hasNavigated.current && ref.current) {
      ref.current.focus();
    }
  }, [hasNavigated, key]);

  return ref;
};

export default useViewFocus;
