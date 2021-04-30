import { Component } from 'react'
import { connect } from 'react-redux'
import { TodoActionDispatcher } from "../../state/TodoState/TodoState";

export class AddTodo extends Component<any, { currentTodoText: string }> {
    constructor(props: any) {
        super(props)
        this.state = { currentTodoText: `[${(new Date()).toLocaleTimeString()}] ` }
    }
    render() {
        return (
            <div>
                <input type="text" name="todoText" id=""
                    value={this.state.currentTodoText}
                    onChange={(evObj) => { this.setState({ currentTodoText: evObj.target.value }) }}
                />
                <button onClick={this.create.bind(this)}>Add Todo</button>
            </div>
        )
    }
    reset() {
        this.setState({ currentTodoText: `[${(new Date()).toLocaleTimeString()}] ` })
    }
    create() {
        this.props.createToDo(this.state.currentTodoText)
        this.reset()
    }
}

const mapStateToProps = (state: any) => ({
})


const mapDispatchToProps = (dispatch: Function) => {
    const { createToDo} = (new TodoActionDispatcher(dispatch)).getDispatchToPropsMap()
    return { createToDo }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
