const Footer = () => {
  return (
    <footer className="is-relative has-text-centered link-dn pb-7">
      <div className="wrapper flow--l">
        <a
          href="#"
          className="is-block flow--s has-text-weight-semibold is-size-7"
        >
          <img
            src="/media/img/icona-mupreva.svg"
            alt=""
            width="30"
            height="48"
            className="is-block mx-auto mb-3"
          />
          Museu de Prehistòria de València
        </a>
        <ul className="is-size-7 has-text-weight-semibold is-flex is-align-items-center is-justify-content-center gap-5">
          <li>
            <a href="/credits/">Crèdits</a>
          </li>
          <li>
            <a href="#">Créditos</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
