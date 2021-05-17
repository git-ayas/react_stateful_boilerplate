import logo from './logo.svg';
import './App.css';
import Todos from './views/todo';
import Counters from './views/counter';
import Stopwatches from './views/stopwatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <div className="App-row">
          <Todos />
          <Counters />
          <Stopwatches/>
        </div>

      </div>
    </div>
  );
}

export default App;
