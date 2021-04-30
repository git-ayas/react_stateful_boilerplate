import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListTodos from './views/todo/ListTodos';
import AddTodo from './views/todo/AddTodo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ToDo App
        </p>
        <ListTodos key={`TodoList-${(new Date()).getTime()}`}></ListTodos>
        <AddTodo></AddTodo>
      </header>
    </div>
  );
}

export default App;
