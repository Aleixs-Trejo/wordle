// React
import { useCallback, useContext, useEffect } from "react";

// CSS
import "./../css/Keyboard.css"

// Context
import { BoardContext } from "../context/BoardContext";

// Components
import Key from "./Key";

// Resources
import deleteIcon from "./../assets/icons/icon-delete-white.svg";
import enterIcon from "./../assets/icons/icon-enter-white.svg";

// Types
import { Char } from "../types/cellType";

const Keyboard: React.FC = () => {
  const { nextLetter, deleteLetter, nextAttemp } = useContext(BoardContext);

  const keys1: Char[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keys2: Char[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'];
  const keys3: Char[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextAttemp();
    } else if (e.key === 'Backspace') {
      deleteLetter();
    } else {
      [...keys1, ...keys2, ...keys3].forEach((key: Char) => {
        if (e.key.toUpperCase() === key) {
          nextLetter(key);
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextLetter, deleteLetter, nextAttemp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return(
    <section className="section__keyboard">
      <div className="keyboard__content">
        <article className="keyboard__row">
          {keys1.map((key: Char, index: number) => (
            <Key keyVal={key} key={index} />
          ))}
        </article>
        <article className="keyboard__row">
          {keys2.map((key, index) => (
            <Key keyVal={key} key={index} />
          ))}
        </article>
        <article className="keyboard__row">
          <Key icon={<img className="img__keyboard__key icon--delete" src={deleteIcon} alt="delete" />} />
          {keys3.map((key, index) => (
            <Key keyVal={key} key={index} />
          ))}
          <Key icon={<img className="img__keyboard__key icon--enter" src={enterIcon} alt="enter" />} />
        </article>
      </div>
    </section>
  )
};

export default Keyboard;