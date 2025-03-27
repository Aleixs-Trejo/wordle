// React
import { useContext, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// Context
import { BoardContext } from "../context/BoardContext";

// CSS
import "./../css/Main.css";

// Components
import Board from "./Board";
import GameOver from "./GameOver";
import Keyboard from "./Keyboard";
import Modal from "./Modal";

// Hooks
import useModal from "../hooks/useModal";

const Main: React.FC = () => {
  const { gameOver } = useContext(BoardContext);
  const { width, height } = useWindowSize();
  const [modalGameOver, openModalGameOver, closeModalGameOver] = useModal();

  // Abrir el modal al terminar el juego
  useEffect(() => {if (gameOver.finish) openModalGameOver()},[gameOver.finish, openModalGameOver]);

  return (
    <div className="main__content">
      <Board />
      {gameOver.finish ? (
        <>
          {gameOver.guessedWord && <Confetti width={width} height={height} />}
          <Modal modal={modalGameOver} closeModal={closeModalGameOver} closable={false}>
            <GameOver />
          </Modal>
        </>
        ) : (
        <Keyboard />
      )}
    </div>
  );
};

export default Main;