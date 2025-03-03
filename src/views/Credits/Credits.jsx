import logoDivalMupreva3x from "@/assets/img/logo-dival-mupreva@3x.svg";
import useGame from "@/hooks/useGame";
import useTranslations from "@/hooks/useTranslations";
import parse from "html-react-parser";

const Credits = ({ lang, content }) => {
  const { setCurrentView } = useGame();
  const t = useTranslations(lang);

  const editedContent = content
    .replaceAll("strong", "h2")
    .replaceAll("<br>", "")
    .replaceAll(/<ul>([\s\S]*?)<\/ul>/g, (match) => {
      const liCount = (match.match(/li/g) || []).length;
      if (liCount > 6) {
        return match.replace("<ul>", '<ul className="cols-list-3">');
      }
      return match;
    });

  return (
    <main className="main-content h-100 is-relative">
      <div className="credits wrapper h-100 flow--xs py-8 has-text-centered is-relative">
        <h1 className="has-text-white has-text-weight-semibold fs-30-44">
          {t("credits")}
        </h1>
        {parse(editedContent, { trim: true })}
        <img
          src={logoDivalMupreva3x}
          alt="Diputació de València"
          className="mt-5"
        />
        <a
          onClick={() => setCurrentView("intro")}
          aria-label="Tornar a la pàgina anterior"
        >
          <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M25.2 0 14 11.202 2.798 0 0 2.8 11.2 14 0 25.202 2.798 28 14 16.802 25.2 28l2.8-2.798L16.8 14 28 2.8z"
              fill="#FFF"
              fillRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </main>
  );
};

export default Credits;
