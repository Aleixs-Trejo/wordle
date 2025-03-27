// React
import { useContext, memo } from "react";

// CSS
import "./../css/Letter.css"

// Context
import { BoardContext } from "../context/BoardContext";

// Props
interface LetterProps {
  letterPos: number;
  attempVal: number;
}

const Letter: React.FC<LetterProps> = ({ letterPos, attempVal }) => {
  const { board, correctWord, currentAttemp } = useContext(BoardContext);
  const letter = board[attempVal][letterPos];

  const correctWordArray = correctWord.split('');
  const attempWordArray = [...board[attempVal]];

  // Contar la concurrencia en la palabra correcta
  const letterCounts: Record<string, number> = {};
  for (const char of correctWordArray) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  // Verificar letras correctas
  /* const correctLetters = attempWordArray.map((char, i) => {
    const isCorrect = char === correctWordArray[i];
    if (isCorrect) letterCounts[char]--;
    return isCorrect;
  }); */

  const correctLetters = new Array(attempWordArray.length).fill(false);
  attempWordArray.forEach((char, i) => {
    if (char === correctWordArray[i]) {
      correctLetters[i] = true;
      letterCounts[char]--;
    }
  });

  const almostLetters = new Array(attempWordArray.length).fill(false);
  attempWordArray.forEach((char, i) => {
    if (!correctLetters[i] && correctWord.includes(char) && letterCounts[char] > 0) {
      almostLetters[i] = true;
      letterCounts[char]--;
    }
  });

  // Estao de la letraaaaa
  const isCorrect = correctLetters[letterPos];
  const isAlmost = almostLetters[letterPos];

  const letterState =
    currentAttemp.attemp > attempVal &&
    (isCorrect ? 'correct' : isAlmost ? 'almost' : 'error');

  console.log(letter, letterState);

  return (
    <div
      style={{ '--delay': `${letterPos * 100}ms` } as React.CSSProperties}
      className={`flex-c-c letter ${letter ? "letter__letter" : ""} letter--${letterState}`}
      translate="no"
      lang="zxx"
      data-translate="no"
    >
      {letter}
    </div>
  );
};

export default memo(Letter);