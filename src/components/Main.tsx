// React
import { useContext } from "react";

// Context
import { BoardContext } from "../context/BoardContext";

// CSS
import "./../css/Main.css";

// Components
import Board from "./Board";
import GameOver from "./GameOver";
import Keyboard from "./Keyboard";

const Main: React.FC = () => {
  const { gameOver } = useContext(BoardContext);
  return (
    <div className="main__content">
      <Board />
      {gameOver.finish ? <GameOver /> : <Keyboard />}
    </div>
  );
};

export default Main;
