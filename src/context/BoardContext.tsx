// React
import { createContext, useEffect, useState } from "react";

// Types
import { Board } from "../types/board";
import { Char } from "../types/cellType";

// Utils
import { boardDefault, generateWordSet } from "../utils/Words";

// Interface
interface BoardProviderProps {
  children: React.ReactNode;
}

interface GameOverType {
  finish: boolean;
  guessedWord: boolean
}

interface BoardContextType {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
  currentAttemp: CurrentAttempType;
  setCurrentAttemp: React.Dispatch<React.SetStateAction<CurrentAttempType>>;
  nextLetter: (keyVal: Char) => void;
  deleteLetter: () => void;
  nextAttemp: () => void;
  correctWord: string;
  disabledLetters: Char[];
  gameOver: GameOverType;
  setGameOver: React.Dispatch<React.SetStateAction<GameOverType>>;
  resetGame: () => void;
}

interface CurrentAttempType {
  attemp: number;
  letterPos: number;
}

const currentAttempInitialState: CurrentAttempType = {
  attemp: 0,
  letterPos: 0,
};

const gameOverInitialState: GameOverType = {
  finish: false,
  guessedWord: false
};

const boardInitialState: BoardContextType = {
  board: boardDefault,
  setBoard: () => {},
  currentAttemp: currentAttempInitialState,
  setCurrentAttemp: () => {},
  nextLetter: () => {},
  deleteLetter: () => {},
  nextAttemp: () => {},
  correctWord: '',
  disabledLetters: [],
  gameOver: gameOverInitialState,
  setGameOver: () => {},
  resetGame: () => {},
};

const BoardContext = createContext<BoardContextType>(boardInitialState);

const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<Board>(boardDefault);
  const [currentAttemp, setCurrentAttemp] = useState<CurrentAttempType>(currentAttempInitialState);
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [disabledLetters, setDisabledLetters] = useState<Char[]>([]);
  const [gameOver, setGameOver] = useState<GameOverType>(gameOverInitialState);
  const [correctWord, setCorrectWord] = useState<string>('');

  useEffect(() => {
    generateWordSet().then(({ wordSet, randomWord }) => {
      setWordSet(wordSet);
      setCorrectWord(randomWord);
    });
  }, [])

  const { attemp, letterPos } = currentAttemp;

  const nextLetter = (keyVal: Char) => {
    if (letterPos > 4 || !keyVal) return;

    const newBoard: Board = [...board].map(row => [...row]) as Board;
    newBoard[attemp][letterPos] = keyVal;
    setBoard(newBoard);

    setCurrentAttemp({ ...currentAttemp, letterPos: letterPos + 1 });
  };

  const deleteLetter = () => {
    if (letterPos === 0) return;
    const newBoard: Board = [...board].map(row => [...row]) as Board;
    newBoard[attemp][letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttemp({ ...currentAttemp, letterPos: letterPos - 1 });
  };

  const nextAttemp = () => {
    if (letterPos < 5) return;
    
    const currentWord: string = board[attemp].join("");
  
    if (wordSet.has(currentWord)) {
      console.log("siguiente intento:", attemp + 1);
      setCurrentAttemp({ ...currentAttemp, attemp: attemp + 1, letterPos: 0 });
      const newDisabledLetters = board[attemp].filter(letter => !correctWord.includes(letter));
      const updatedDisabledLetters = new Set([...disabledLetters, ...newDisabledLetters]);
      setDisabledLetters([...updatedDisabledLetters]);
      console.log("Nuevas letras deshabilitados: ", newDisabledLetters);
      console.log("Total letras deshabilitadas: ", updatedDisabledLetters);
    } else {
      alert("No existe en la lista de palabras del juego");
    }

    if (currentWord === correctWord) {
      setGameOver({ finish: true, guessedWord: true });
      return;
    }

    if (attemp === 5) {
      setGameOver({ finish: true, guessedWord: false });
      return;
    }

    // Deshabilitar letras
    const newDisabledLetters = board[attemp].filter(letter => !correctWord.includes(letter));
    const updatedDisabledLetters = new Set([...disabledLetters, ...newDisabledLetters]);
    setDisabledLetters([...updatedDisabledLetters]);
  };

  const resetGame = () => {
    setBoard(boardDefault);
    console.log("boardDefault", boardDefault);
    setCurrentAttemp(currentAttempInitialState);
    setGameOver(gameOverInitialState);
    setDisabledLetters([]);
  };

  const value = { board, setBoard, currentAttemp, setCurrentAttemp, nextLetter, deleteLetter, nextAttemp, correctWord, disabledLetters, gameOver, setGameOver, resetGame };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardProvider };