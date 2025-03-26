// CSS
import "./../css/Board.css"

// Components
import Letter from "./Letter";

// Array
const ROWS = 6;
const COLUMNS = 5;

const Board: React.FC = () => {
  return(
    <section className="section__board">
      {Array.from({ length: ROWS }).map((_, rowId) => (
        <article key={rowId} className="board__row">
          {Array.from({ length: COLUMNS }).map((_, colId) => (
            <Letter key={colId} letterPos={colId} attempVal={rowId} />
          ))}
        </article>
      ))}
    </section>
  )
};

export default Board;