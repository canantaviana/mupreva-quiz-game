import Footer from "@/components/Footer/Footer";
import useGame from "@/hooks/useGame";

const Thanks = () => {
  const { levels, levelCount } = useGame();
  return (
    <>
      <main className="main-content h-100 is-relative">
        <div className="gracies wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
          <h1 className="has-text-white has-text-weight-bold fs-24-34">
            Gràcies per jugar!
          </h1>
          <p className="has-text-weight-bold fs-20-24 is-flex is-align-items-center has-text-centered">
            {levels[levelCount - 1].title}
          </p>
          <div className="has-text-centered">
            <a href="/" className="button button--lg">
              OK
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Thanks;
