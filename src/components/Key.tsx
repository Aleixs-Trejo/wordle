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
  const { nextLetter, deleteLetter, nextAttemp, disabledLetters } = useContext(BoardContext);

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

  return(
    <button
      className={`flex-c-c keyboard__key ${icon ? 'keyboard__key--icon' : ''}`}
      onClick={selectLetter}
      disabled={keyVal ? disabledLetters.includes(keyVal) : false}
    >
      {icon ? icon : keyVal}
    </button>
  )
};

export default Key;