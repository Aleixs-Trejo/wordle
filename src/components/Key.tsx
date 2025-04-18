// React
import React, { JSX, useContext } from "react";

// Context
import { BoardContext } from "../context/BoardContext";

// Types
import { Char } from "../types/cellType";

// Props
interface KeyProps {
  keyVal?: Char;
  icon?: JSX.Element;
}

const Key: React.FC<KeyProps> = ({ keyVal, icon }) => {
  const {
    nextLetter,
    deleteLetter,
    nextAttemp,
    correctLetters,
    almostLetters,
    errorLetters } = useContext(BoardContext);

  const selectLetter = () => {
    if (icon?.props.alt === 'enter') {
      nextAttemp();
    } else if (icon?.props.alt === 'delete') {
      deleteLetter();
    } else {
      if (!keyVal) return;
      nextLetter(keyVal);
    }
  };

  let keyClass = "";
  if (keyVal) {
    if (correctLetters.includes(keyVal)) {
      keyClass = "key--correct";
    } else if (almostLetters.includes(keyVal)) {
      keyClass = "key--almost";
    } else if (errorLetters.includes(keyVal)) {
      keyClass = "key--error"
    }
  }

  return(
    <button
      className={`flex-c-c keyboard__key ${icon ? 'keyboard__key--icon' : ''} ${keyClass}`}
      onClick={selectLetter}
      translate="no"
      lang="zxx"
      data-translate="no"
    >
      {icon ? icon : keyVal}
    </button>
  )
};

export default Key;