
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

/**
 * Handles immutation of state
 */
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
        /**
         * Always return deep copy of state 
         * and not the same object again, 
         * else your components won't re-render  
         */ 
        return [...this.state]
    }

}
/**
 * Prepares action data for dispatch
 */
export class TodoActionDispatcher {
    storedDispatch: Function
    /**
     * Stores dispatch prop for action calls
     * @param dispatch dispatch argument received in mapDispatchToProps
     */
    constructor(dispatch: Function) {
        this.storedDispatch = dispatch
    }
    //----- action methods -----//
    createToDo(text: string) {
        const todo: TodoStateType = {
            id: `todo-${Math.ceil(Math.random() * 10000)}-${(new Date()).getTime()}`,
            text,
            done: false
        };
        this.storedDispatch({
            type: TodoVerbs.CREATE,
            details: todo
        })
        
    }
    updateToDo() {
        
    }
    deleteToDo(todoId: string) {
        
    }
    //----- !action methods -----//

    /**
     * returns function list to return in mapDispatchToProps
     */
    getDispatchToPropsMap() {
        const { deleteToDo, createToDo: create, updateToDo: update } = this
        // remember to bind functions in returned object so that they don't lose access to current context 
        return { create: create.bind(this), update: update.bind(this), deleteToDo: deleteToDo.bind(this) }
    }
}