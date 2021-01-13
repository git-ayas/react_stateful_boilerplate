import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TodoStateType } from '../state/TodoState/TodoState'

/**
 * Pro-tip: If you are using any form of state management 
 * then try your best to keep your connected component from 
 * having its own state.
 */
class ListTodos extends Component<any, any> {

    render() {
        const todoItems = this.props.todos.map ? this.props.todos.map((todo: TodoStateType) => (
            <li key={"list-item-" + (new Date()).getTime()+Math.random()}>{todo.text}</li>
        )) : []

        return (
            <ul key={"list-" + (new Date()).getTime()}>{todoItems}</ul>
        )
    }
}


const mapStateToProps = (state: any) => {
    const { todos } = state
    return { todos }

}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos)
