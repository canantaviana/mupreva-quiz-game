import logoDivalMupreva3x from "@/assets/img/logo-dival-mupreva@3x.svg";
import useGame from "@/hooks/useGame";
import useTranslations from "@/hooks/useTranslations";
import useViewFocus from "@/hooks/useViewFocus";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import parse from "html-react-parser";

const LANG_CODES = { vlca: "ca", spa: "es" };

/**
 * Credits come from the CMS: a paragraph that only holds a <strong> is a section title,
 * so it becomes an <h2> (other bold text stays bold); long lists go in three columns.
 */
const prepareCredits = (content) => {
  const doc = new DOMParser().parseFromString(content || "", "text/html");
  doc.querySelectorAll("br").forEach((br) => br.remove());
  doc.querySelectorAll("p > strong, body > strong").forEach((strong) => {
    const p = strong.parentElement === doc.body ? strong : strong.parentElement;
    if (p.textContent.trim() === strong.textContent.trim()) {
      const h2 = doc.createElement("h2");
      h2.innerHTML = strong.innerHTML;
      p.replaceWith(h2);
    }
  });
  doc.querySelectorAll("ul").forEach((ul) => {
    if (ul.querySelectorAll(":scope > li").length > 6) {
      ul.classList.add("cols-list-3");
    }
  });
  return doc.body.innerHTML;
};

const Credits = ({ lang, content }) => {
  const { setCurrentView, title } = useGame();
  const t = useTranslations(lang);
  const headingRef = useViewFocus();
  useDocumentTitle([t("credits"), title[lang]]);

  return (
    <main className="main-content h-100 is-relative" lang={LANG_CODES[lang]}>
      <div className="credits wrapper h-100 flow--xs py-8 has-text-centered is-relative">
        <h1 className="has-text-white has-text-weight-semibold fs-30-44" ref={headingRef} tabIndex={-1}>
          {t("credits")}
        </h1>
        {parse(prepareCredits(content), { trim: true })}
        <img src={logoDivalMupreva3x} alt={t("valencia")} className="mt-5" />
        <button
          type="button"
          className="credits__close"
          onClick={() => setCurrentView("intro")}
          aria-label={t("close_credits")}
        >
          <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path
              d="M25.2 0 14 11.202 2.798 0 0 2.8 11.2 14 0 25.202 2.798 28 14 16.802 25.2 28l2.8-2.798L16.8 14 28 2.8z"
              fill="#FFF"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </main>
  );
};

export default Credits;
