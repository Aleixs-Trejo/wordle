// React
import { useContext } from "react";

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
  const attempWordArray = board[attempVal];

  // Contar la concurrencia en la palabra correcta
  const letterCounts: Record<string, number> = {};
  correctWordArray.forEach(char => {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  });

  // Verificar letras correctas
  const correctLetters = attempWordArray.map((char, i) => char === correctWordArray[i]);

  // Contar letras ya asignadas
  correctLetters.forEach((isCorrect, i) => {
    if (isCorrect) letterCounts[correctWordArray[i]]--; // Restar porque ya se usó
  });

  // Verificar el almost pa ver si se repite o non
  const isCorrect = correctLetters[letterPos];
  const isAlmost = !isCorrect
    && letter !== ''
    && correctWord.includes(letter)
    && letterCounts[letter] > 0;

  if (isAlmost) letterCounts[letter]--;

  const letterState =
    currentAttemp.attemp > attempVal &&
    (isCorrect ? 'correct' : isAlmost ? 'almost' : 'error');
  
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

export default Letter;