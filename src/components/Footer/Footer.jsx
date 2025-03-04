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
          <li>
            <a onClick={() => setCurrentView("credits_vlca")} href="#">
              Crèdits
            </a>
          </li>
          <li>
            <a onClick={() => setCurrentView("credits_spa")} href="#">
              Créditos
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
