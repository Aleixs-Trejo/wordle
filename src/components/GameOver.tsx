// React
import React, { useContext } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

// CSS
import "./../css/GameOver.css"

// Context
import { BoardContext } from "../context/BoardContext";


const GameOver: React.FC = () => {
  const { width, height } = useWindowSize();
  const { gameOver, correctWord, currentAttemp, resetGame } = useContext(BoardContext);

  return(
    <section className="section__game-over">
      {gameOver.guessedWord && gameOver.finish && <Confetti width={width} height={height} />}
      <div className="game-over__container">
        <article className="game-over__header">
          <h2 className="game-over__title">Juego Terminado</h2>
        </article>
        <article className="game-over__content">
          <p className="game-over__text">
            {gameOver.guessedWord ? "¡Felicitaciones! ¡Has conseguido la palabra!" : "Parece que no lo conseguiste 😿."}
          </p>
          <h3 className="game-over__subtext">
            La palabra era: {correctWord}
          </h3>
          {gameOver.guessedWord && (
            <span className="game-over__span">
              Lo conseguiste en {currentAttemp.attemp} intentos.
            </span>
          )}
          <button onClick={resetGame}>Volver a jugar</button>
        </article>
      </div>
    </section>
  );
};

export default GameOver;
