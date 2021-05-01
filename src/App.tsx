import logo from './logo.svg';
import './App.css';
import Todos from './Todos';
import Counters from './Counters';

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
        </div>

      </div>
    </div>
  );
}

export default App;
