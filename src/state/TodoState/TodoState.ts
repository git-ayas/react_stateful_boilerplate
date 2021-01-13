
export enum TodoVerbs {
    CREATE, UPDATE, DELETE
}
/**
 * This is equivalent to:
 * type LogLevelStrings = 'CREATE'|'UPDATE'|'DELETE';
 */
export type TodoVerbNames = keyof typeof TodoVerbs
interface TodoAction {
    type: TodoVerbs;
    details: any;
}
export interface TodoStateType {
    id: string;
    text: string;
    done: boolean;
}
const reducer = (state: Array<TodoStateType>, action: TodoAction) => {
    // Doing the same work being done in reducer function but in a separate class
    return (new TodoActionParser(state, action)).getState()
}
export default reducer
class TodoActionParser {
    state: Array<TodoStateType>
    constructor(state: Array<TodoStateType> = [], action: TodoAction) {
        this.state = state
        switch (action.type) {
            case TodoVerbs.CREATE:
                this.create(action.details)
                break;
            case TodoVerbs.UPDATE:
                this.update(action.details)
                break;
            case TodoVerbs.DELETE:
                this.delete(action.details.id)
                break;
            default:
                break;
        }
    }
    private create(todo: TodoStateType) {
        if (this.state.push) this.state.push(todo)

    }
    private update(todoData: TodoStateType) {
        this.state = this.state.map((todo) => {
            if (todoData.id === todo.id) {
                return todoData
            }
            return todo
        })
    }
    private delete(todoId: string) {
        this.state = this.state.filter((todo) => {
            if (todo.id.indexOf(todoId) > -1) {
                return false;
            }
            return true
        })
    }
    getState() {
        return [...this.state]
    }

}