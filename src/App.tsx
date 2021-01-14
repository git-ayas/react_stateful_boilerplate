import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListTodos  from './elements/ListTodos';
import AddTodo  from './elements/AddTodo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Sample ToDo App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React docs
        </a>
          <ListTodos key={`TodoList-${(new Date()).getTime()}`}></ListTodos>
          <AddTodo></AddTodo>
      </header>
    </div>
  );
}

export default App;
