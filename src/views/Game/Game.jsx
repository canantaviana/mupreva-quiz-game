import Intro from "../Intro/Intro";

const Game = ({ data }) => {
  const { title } = data;
  return (
    <>
      <Intro title={title} />
    </>
  );
};

export default Game;
