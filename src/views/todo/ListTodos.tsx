import { Component } from 'react'
import { connect } from 'react-redux'
import { TodoActionDispatcher, TodoStateEntryType } from '../../state/TodoState'

/**
 * Pro-tip: If you are using any form of state management 
 * then try your best to keep your connected component from 
 * having its own state especiall in cases where you just have 
 * to simply display data.
 */
class ListTodos extends Component<any, any> {

    render() {
        const todoItems = this.props.todos.map ? this.props.todos.map((todo: TodoStateEntryType) => (
            <li key={"todo-list-item-" + (new Date()).getTime() + Math.random()}>
                <span className="todo-status-toggle" onClick={() => { this.toggleTodo(todo) }}>{todo.done ? "✅" : "🔲"}</span>
                {todo.text}
                <small><button className="todo-delete-button" onClick={() => { this.deleteTodo(todo) }}>[-]</button></small>
            </li>
        )) : []

        return (
            <ul className="todo-list" key={"todo-list-" + (new Date()).getTime()}>{todoItems}</ul>
        )
    }
    toggleTodo(toDo: TodoStateEntryType) {
        toDo.done = !toDo.done
        this.props.updateToDo(toDo.id, toDo.done, toDo.text)

    }
    deleteTodo(todo: TodoStateEntryType) {
        this.props.deleteToDo(todo.id)
    }
}


const mapStateToProps = (state: any) => {
    const { todos } = state
    return { todos }

}

const mapDispatchToProps = (dispatch: Function) => {
    return (new TodoActionDispatcher(dispatch)).getDispatchToPropsMap()
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos)
