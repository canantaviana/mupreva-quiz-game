import useGame from "@/hooks/useGame";
import iconaMupreva from "@/assets/img/icona-mupreva.svg";

const Footer = () => {
  const { setCurrentView } = useGame();
  return (
    <footer className="is-relative has-text-centered link-dn pb-7">
      <div className="wrapper flow--l">
        <a
          href="#"
          className="is-block flow--s has-text-weight-semibold is-size-7"
        >
          <img
            src={iconaMupreva}
            alt=""
            width="30"
            height="48"
            className="is-block mx-auto mb-3"
          />
          Museu de Prehistòria de València
        </a>
        <ul className="is-size-7 has-text-weight-semibold is-flex is-align-items-center is-justify-content-center gap-5">
          <li>
            <a onClick={() => setCurrentView("credits")}>Crèdits</a>
          </li>
          <li>
            <a onClick={() => setCurrentView("credits")}>Créditos</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
