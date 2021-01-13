import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TodoVerbs, TodoStateType } from "../state/TodoState/TodoState";

export class AddTodo extends Component<any, any> {
    render() {
        return (
            <div>
                <button onClick={this.create.bind(this)}>Add Sample Todo</button>
            </div>
        )
    }
    create() {
        const todoTimestamp = new Date()
        const sample: TodoStateType = {
            id: "" + todoTimestamp.getTime(),
            done: false,
            text: `Sample Todo created at ${todoTimestamp.toLocaleString()}`

        }
        this.props.create(sample)

    }
}

const mapStateToProps = (state: any) => ({
    todos: state
})

const mapDispatchToProps = (dispatch: any) => {
    return ({
        create: (Todo: TodoStateType) => {
            dispatch({
                type: TodoVerbs.CREATE,
                details: Todo
            })
        }
    })

}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
