import useGame from "@/hooks/useGame";
import useTranslations from "@/hooks/useTranslations";
import iconaMupreva from "@/assets/img/icona-mupreva.svg";

const Footer = () => {
  const t = useTranslations();

  const { setCurrentView } = useGame();
  return (
    <footer className="is-relative has-text-centered link-dn pb-7">
      <div className="wrapper flow--l">
        <a
          href="https://mupreva.org/"
          className="is-inline-block flow--s has-text-weight-semibold is-size-7"
        >
          <img
            src={iconaMupreva}
            alt=""
            width="30"
            height="48"
            className="is-block mx-auto mb-3"
          />
          {t("museum")}
        </a>
        <ul className="is-size-7 has-text-weight-semibold is-flex is-align-items-center is-justify-content-center gap-5">
          {/* buttons (they change the screen, they don't go to a page), each in its language */}
          <li>
            <button type="button" className="button-link" lang="ca" onClick={() => setCurrentView("credits_vlca")}>
              Crèdits
            </button>
          </li>
          <li>
            <button type="button" className="button-link" lang="es" onClick={() => setCurrentView("credits_spa")}>
              Créditos
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
