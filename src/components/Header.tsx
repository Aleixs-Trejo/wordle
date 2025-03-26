// cSS
import "./../css/Header.css"

const Header: React.FC = () => {
  return(
    <div className="app__header">
      <h2 className="app__title">Wordle</h2>
      <span className="app__subtitle">
        Developed by
        <a href="https://github.com/Aleixs-Trejo">Alesis 🐱</a>
      </span>
    </div>
  )
};

export default Header;