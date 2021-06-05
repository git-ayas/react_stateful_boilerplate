import logo from './logo.svg';
import './App.css';
import Stopwatches from './views/stopwatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <div className="App-row">
          <Stopwatches/>
        </div>
      </div>
      <div className="App-footer">
        <small>Check out the code at <a href="https://github.com/git-ayas/redux_boilerplate" target="_blank" rel="noopener noreferrer">Github</a></small>
      </div>
    </div>
  );
}

export default App;
