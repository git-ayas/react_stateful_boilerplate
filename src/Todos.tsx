import React from 'react'
import AddTodo from './views/todo/AddTodo'
import ListTodos from './views/todo/ListTodos'

function Todos() {
    return (
        <div className="App-col">
            <p>
                To-Dos
            </p>
            <ListTodos key={`TodoList-${(new Date()).getTime()}`}></ListTodos>
            <AddTodo></AddTodo>
        </div>
    )
}

export default Todos
