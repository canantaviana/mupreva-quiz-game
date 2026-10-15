import { useEffect } from "react";

/**
 * Page title: what this screen is, then the game and the museum (WCAG 2.4.2)
 */
const useDocumentTitle = (parts) => {
  const text = parts.filter(Boolean).join(" | ");
  useEffect(() => {
    document.title = text ? text + " | MUPREVA" : "MUPREVA";
  }, [text]);
};

export default useDocumentTitle;
