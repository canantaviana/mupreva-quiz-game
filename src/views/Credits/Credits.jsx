import logoDivalMupreva3x from "@/assets/img/logo-dival-mupreva@3x.svg";
import useGame from "@/hooks/useGame";

const Credits = () => {
  const { setCurrentView } = useGame();

  return (
    <main className="main-content h-100 is-relative">
      <div className="credits wrapper h-100 flow--xs py-8 has-text-centered is-relative">
        <h1 className="has-text-white has-text-weight-semibold fs-30-44">
          Crèdits
        </h1>
        <p className="has-text-primary has-text-weight-bold mt-7">
          Concurs interactiu “Històries en miniatura&quot;
        </p>
        <h2>Idea i continguts</h2>
        <ul>
          <li>Manuel Gozalbes Fernández de Palencia</li>
          <li>Ángel Sánchez Molina</li>
        </ul>
        <h2>Desenvolupament i disseny aplicació</h2>
        <p>Render Comunicación S.L.</p>
        <h2>Producció</h2>
        <p>Museu de Prehistòria de València </p>
        <h2>Traducció al valencià</h2>
        <p>Unitat de Normalització Lingüística de la Diputació de València</p>
        <h2>Agraïments</h2>
        <ul className="cols-list-3">
          <li>Begonya Soler</li>
          <li>Fernando Bardisa Rodríguez</li>
          <li>Vicente Juan Berenguer García</li>
          <li>Raquel Fernández García</li>
          <li>Carmen García-Rayo García</li>
          <li>Juan Vicente Gonzalez Cantó</li>
          <li>Aida Lleó Dols</li>
          <li>Antonio Martínez Ibáñez</li>
          <li>María del Mar Meseguer Escrivà</li>
          <li>Alba Pérez Martínez</li>
          <li>Emilio Peris Blanch</li>
          <li>Pedro Ramos Pérez</li>
          <li>José Manuel Torregrosa Yago</li>
        </ul>
        <img
          src={logoDivalMupreva3x}
          alt="Diputació de València"
          className="mt-5"
        />
        <p className="mt-5">
          <small>
            <span className="is-block has-text-primary has-text-weight-bold">
              Nota dels productors
            </span>
            Aquest interactiu ha estat produït per a l&apos;exposició
            &quot;Històries en miniatura&quot; amb una finalitat exclusivament
            educativa.
          </small>
        </p>
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
