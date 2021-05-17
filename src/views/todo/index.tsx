import React from 'react'
import AddTodo from './AddTodo'
import ListTodos from './ListTodos'

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
