// Types
import { Board } from "../types/board";

// Word Bank
import wordBank from "./wordle-bank.txt";

const boardDefault: Board = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

const generateWordSet = async (): Promise<{ wordSet: Set<string>; randomWord: string }> => {
  try {
    const res = await fetch(wordBank);
    if (!res.ok) throw new Error('Failed to fetch word bank');
    const text = await res.text();
    const wordSet = new Set(text.split('\n').map(word => word.trim().toUpperCase()).filter(word => word.length > 0));
    const wordArray = [...wordSet];

    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    return { wordSet, randomWord };
  } catch (error) {
    console.error(`Error en la petición de la lista de palabras: ${error}`);
    return { wordSet: new Set(), randomWord: '' };
  }
};

export { boardDefault, generateWordSet };