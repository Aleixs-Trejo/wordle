// CSS
import './App.css'

// Components
import Header from './components/Header';
import Main from './components/Main';
import { BoardProvider } from './context/BoardContext';

function App() {

  return (
    <BoardProvider>
      <div className="App">
        <section className="container section__app">
          <Header />
        </section>
        <section className="container section__app">
          <Main />
        </section>
      </div>
    </BoardProvider>
  );
}

export default App
