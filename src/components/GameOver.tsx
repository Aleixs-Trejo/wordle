// React
import React, { useContext } from "react";

// CSS
import "./../css/GameOver.css"

// Icons
import iconLoop from "./../assets/icons/icon-loop-white.svg";

// Context
import { BoardContext } from "../context/BoardContext";


const GameOver: React.FC = () => {
  const { gameOver, correctWord, currentAttemp, resetGame } = useContext(BoardContext);

  return(
    <section className="section__game-over">
      <div className="game-over__container">
        <article className="game-over__header">
          <h2 className="game-over__title">Juego Terminado</h2>
        </article>
        <article className="game-over__content">
          <p className="game-over__text">
            {gameOver.guessedWord ? "¡Felicitaciones! ¡Has conseguido la palabra!" : "Parece que no lo conseguiste 😿. Hay que mejorar ese léxico..."}
          </p>
          <div className="game-over__subtexts">
            <span>La palabra era:</span>
            <span className="game-over__correct-word">{correctWord}</span>
          </div>
          <a className="game-over__word" target="_blank" rel="noreferrer" href={`https://dle.rae.es/${correctWord}`}>¿Quieres conocer su significado?</a>
          {gameOver.guessedWord && (
            <span className="game-over__span">
              Lo conseguiste en {currentAttemp.attemp} intentos.
            </span>
          )}
          <button className="flex-c-c btn__reset" onClick={resetGame}>
            <img className="img__game-over" src={iconLoop} alt="loop" />
          </button>
        </article>
      </div>
    </section>
  );
};

export default GameOver;
