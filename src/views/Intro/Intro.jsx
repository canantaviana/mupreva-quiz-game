import Footer from "../../components/Footer/Footer";
import imatgeMonedaDenari from "@/assets/img/imatge-moneda-denari.png";
import imatgeMonedaDenari2x from "@/assets/img/imatge-moneda-denari@2x.png";

const Intro = ({ title, startCount }) => {
  const handleClick = (lang) => {
    startCount(lang);
  };

  return (
    <>
      <main className="main-content h-100 is-relative">
        <div className="wrapper h-100 is-flex is-flex-direction-column is-justify-content-center is-align-items-center flow--l">
          <img
            src={imatgeMonedaDenari}
            srcSet={`${imatgeMonedaDenari2x} 2x`}
            alt=""
            width="95"
            height="93"
          />
          <div className="intro is-flex">
            <div className="flow--l pr-5 has-text-right">
              <div className="flow--l is-relative">
                <h1 className="has-text-primary fs-24-34 has-text-weight-bold">
                  Concurs-<span className="is-block fs-40-60">Quiz</span>
                </h1>
                <h2 className="fs-20-24 has-text-weight-bold">{title.vlca}</h2>
              </div>
              <a onClick={() => handleClick("vlca")} className="button">
                Valencià
              </a>
            </div>
            <div className="flow--l pl-5">
              <h1 className="has-text-primary fs-24-34 has-text-weight-bold">
                Concurso-<span className="is-block fs-40-60">Quiz</span>
              </h1>
              <h2 className="fs-20-24 has-text-weight-bold">{title.spa}</h2>
              <a onClick={() => handleClick("spa")} className="button">
                Castellano
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Intro;
