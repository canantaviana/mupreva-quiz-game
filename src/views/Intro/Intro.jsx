import useGame from "@/hooks/useGame";
import useViewFocus from "@/hooks/useViewFocus";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import Footer from "@/components/Footer/Footer";
import vlca from "@/translations/vlca.json";
import spa from "@/translations/spa.json";

// the intro is in both languages at once: each block says its language (WCAG 3.1.2)
const Intro = ({ startGame, logo }) => {
  const { title, timeLimit, setTimeLimit } = useGame();
  const headingRef = useViewFocus();
  useDocumentTitle([title.vlca]);

  return (
    <>
      <main className="main-content h-100 is-relative">
        <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
          {/* decorative: the game title is right below */}
          {logo ? <img src={logo} alt="" width="95" height="93" /> : null}

          <div className="intro is-flex">
            <div className="flow--l pr-5 has-text-right" lang="ca">
              <div className="flow--l is-relative">
                <h1 className="intro__title has-text-primary fs-24-34 has-text-weight-bold" ref={headingRef} tabIndex={-1}>
                  Concurs-<span className="is-block fs-40-60">Quiz</span>
                </h1>
                <h2 className="fs-20-24 has-text-weight-bold">{title.vlca}</h2>
              </div>
              <button
                type="button"
                onClick={() => startGame("vlca")}
                className="button"
              >
                Valencià
              </button>
            </div>
            <div className="flow--l pl-5" lang="es">
              {/* same title in Spanish: not a second h1 */}
              <p className="intro__title has-text-primary fs-24-34 has-text-weight-bold">
                Concurso-<span className="is-block fs-40-60">Quiz</span>
              </p>
              <h2 className="fs-20-24 has-text-weight-bold">{title.spa}</h2>
              <button
                type="button"
                onClick={() => startGame("spa")}
                className="button"
              >
                Castellano
              </button>
            </div>
          </div>

          {/* each question has 30 seconds unless the player turns the limit off (WCAG 2.2.1) */}
          <div className="intro__time field has-text-centered">
            <input
              type="checkbox"
              id="no-time-limit"
              className="intro__time-check"
              checked={!timeLimit}
              onChange={(e) => setTimeLimit(!e.target.checked)}
            />{" "}
            <label htmlFor="no-time-limit" className="has-text-weight-semibold">
              <span lang="ca">{vlca.no_time_limit}</span>
              {" / "}
              <span lang="es">{spa.no_time_limit}</span>
            </label>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Intro;
