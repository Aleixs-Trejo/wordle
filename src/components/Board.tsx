// CSS
import "./../css/Board.css"

// Components
import Letter from "./Letter";

// Context

const Board: React.FC = () => {
  return(
    <section className="section__board">
      <article className="board__row">
        <Letter letterPos={0} attempVal={0} />
        <Letter letterPos={1} attempVal={0} />
        <Letter letterPos={2} attempVal={0} />
        <Letter letterPos={3} attempVal={0} />
        <Letter letterPos={4} attempVal={0} />
      </article>
      <article className="board__row">
        <Letter letterPos={0} attempVal={1} />
        <Letter letterPos={1} attempVal={1} />
        <Letter letterPos={2} attempVal={1} />
        <Letter letterPos={3} attempVal={1} />
        <Letter letterPos={4} attempVal={1} />
      </article>
      <article className="board__row">
        <Letter letterPos={0} attempVal={2} />
        <Letter letterPos={1} attempVal={2} />
        <Letter letterPos={2} attempVal={2} />
        <Letter letterPos={3} attempVal={2} />
        <Letter letterPos={4} attempVal={2} />
      </article>
      <article className="board__row">
        <Letter letterPos={0} attempVal={3} />
        <Letter letterPos={1} attempVal={3} />
        <Letter letterPos={2} attempVal={3} />
        <Letter letterPos={3} attempVal={3} />
        <Letter letterPos={4} attempVal={3} />
      </article>
      <article className="board__row">
        <Letter letterPos={0} attempVal={4} />
        <Letter letterPos={1} attempVal={4} />
        <Letter letterPos={2} attempVal={4} />
        <Letter letterPos={3} attempVal={4} />
        <Letter letterPos={4} attempVal={4} />
      </article>
      <article className="board__row">
        <Letter letterPos={0} attempVal={5} />
        <Letter letterPos={1} attempVal={5} />
        <Letter letterPos={2} attempVal={5} />
        <Letter letterPos={3} attempVal={5} />
        <Letter letterPos={4} attempVal={5} />
      </article>
    </section>
  )
};

export default Board;