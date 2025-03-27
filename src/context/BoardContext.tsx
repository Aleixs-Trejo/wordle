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
  gameOver: GameOverType;
  setGameOver: React.Dispatch<React.SetStateAction<GameOverType>>;
  resetGame: () => void;
  correctLetters: Char[];
  almostLetters: Char[];
  errorLetters: Char[];
  checkWord: () => void;
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
  gameOver: gameOverInitialState,
  setGameOver: () => {},
  resetGame: () => {},
  correctLetters: [],
  almostLetters: [],
  errorLetters: [],
  checkWord: () => {}
};

const BoardContext = createContext<BoardContextType>(boardInitialState);

const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<Board>(boardDefault);
  const [currentAttemp, setCurrentAttemp] = useState<CurrentAttempType>(currentAttempInitialState);
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState<GameOverType>(gameOverInitialState);
  const [correctWord, setCorrectWord] = useState<string>('');
  const [correctLetters, setCorrectLetters] = useState<Char[]>([]);
  const [almostLetters, setAlmostLetters] = useState<Char[]>([]);
  const [errorLetters, setErrorLetters] = useState<Char[]>([]);

  useEffect(() => {
    generateWordSet().then(({ wordSet, randomWord }) => {
      setWordSet(wordSet);
      setCorrectWord(randomWord);
    });
  }, []);

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

    if (!wordSet.has(currentWord)) {
      alert("No existe en la lista de palabras del juego");
      return;
    }

    console.log("siguiente intento:", attemp + 1);
    setCurrentAttemp({ ...currentAttemp, attemp: attemp + 1, letterPos: 0 });

    // Concurrencia de cada letra de la palabra real
    const realWordMap: Record<string, number> = {};
    for (const letter of correctWord) {
      realWordMap[letter] = (realWordMap[letter] || 0) + 1;
    }

    const newCorrectLetters: Char[] = [...correctLetters];
    const newAlmostLetters: Char[] = [...almostLetters];
    const newErrorLetters: Char[] = [...errorLetters];

    // Verificar letras correctas
    const usedIndex = new Set<number>();
    board[attemp].forEach((letter, index) => {
      if (correctWord[index] === letter) {
        newCorrectLetters.push(letter);
        realWordMap[letter]--;
        usedIndex.add(index)
      }
    });

    // Verificar letras casi correctas
    board[attemp].forEach((letter, index) => {
      if (usedIndex.has(index)) return;

      if (correctWord.includes(letter) && realWordMap[letter] > 0) {
        console.log("almosLetter: ", letter);
        newAlmostLetters.push(letter)
        realWordMap[letter]--;
        console.log("totalAlmostLetters: ", newAlmostLetters);
      } else if (!newCorrectLetters.includes(letter) && !newAlmostLetters.includes(letter)) {
        newErrorLetters.push(letter);
      }
    })

    checkWord();

    const updatedErrorLetters = new Set([...errorLetters, ...newErrorLetters]);
  
    setErrorLetters([...updatedErrorLetters]);

    console.log("Nuevas letras deshabilitados: ", newErrorLetters);
    console.log("Total letras deshabilitadas: ", updatedErrorLetters);

    if (currentWord === correctWord) {
      setGameOver({ finish: true, guessedWord: true });
      return;
    }

    if (attemp === 5) {
      setGameOver({ finish: true, guessedWord: false });
      return;
    }
  };

  const checkWord = () => {
    const newCorrectLetters = new Set(correctLetters);
    const newAlmostLetters = new Set(almostLetters);

    board[attemp].forEach((letter, index) => {
      if (letter === correctWord[index]) {
        newCorrectLetters.add(letter);
      } else if (correctWord.includes(letter)) {
        newAlmostLetters.add(letter);
      }
    });

    setCorrectLetters([...newCorrectLetters]);
    setAlmostLetters([...newAlmostLetters]);
  };

  const resetGame = () => {
    setBoard(boardDefault);
    setCurrentAttemp(currentAttempInitialState);
    setGameOver(gameOverInitialState);
    setErrorLetters([]);
    generateWordSet().then(({ wordSet, randomWord }) => {
      setWordSet(wordSet);
      setCorrectWord(randomWord);
    });
    // Reiniciar letras correctas y almost
    setCorrectLetters([]);
    setAlmostLetters([])
  };

  const value = {
    board,
    setBoard,
    currentAttemp,
    setCurrentAttemp,
    nextLetter,
    deleteLetter,
    nextAttemp,
    correctWord,
    gameOver,
    setGameOver,
    resetGame,
    correctLetters,
    almostLetters,
    errorLetters,
    checkWord
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardProvider };