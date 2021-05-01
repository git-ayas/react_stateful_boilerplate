
export enum CounterVerbs {
    CREATE_COUNTER = "CREATE_COUNTER",
    UPDATE_COUNTER = "UPDATE_COUNTER",
    DELETE_TODO = "DELETE_TODO"
}
/**
 * This is equivalent to:
 * type LogLevelStrings = 'CREATE'|'UPDATE'|'DELETE';
 */
export type CounterVerbNames = keyof typeof CounterVerbs
interface CounterAction {
    type: CounterVerbs;
    details: any;
}
export interface CounterStateType {
    id: string;
    text: string;
    count: number;
}
const reducer = (state: Array<CounterStateType>, action: CounterAction) => {
    // Doing the same work being done in reducer function but in a separate class
    return (new CounterActionParser(state, action)).getState()
}
export default reducer

/**
 * Handles immutation of state
 */
class CounterActionParser {
    state: Array<CounterStateType>
    constructor(state: Array<CounterStateType> = (localStorage.getItem("counters") === null ? [] : JSON.parse(localStorage.getItem("counters") as string)), action: CounterAction) {
        this.state = state
        switch (action.type) {
            case CounterVerbs.CREATE_COUNTER:
                this.create(action.details)
                break;
            case CounterVerbs.UPDATE_COUNTER:
                this.update(action.details)
                break;
            case CounterVerbs.DELETE_TODO:
                this.delete(action.details.id)
                break;
            default:
                break;
        }
    }
    private create(Counter: CounterStateType) {
        if (this.state.push) this.state.push(Counter)

    }
    private update(CounterData: { id: string, increment: boolean, text: string }) {
        this.state = this.state.map((Counter) => {
            if (CounterData.id === Counter.id) {
                if (CounterData.increment) {
                    Counter.count++
                } else {
                    if (Counter.count > 0) Counter.count--;
                }
                return Counter
            }
            return Counter
        })
    }
    private delete(CounterId: string) {
        this.state = this.state.filter((Counter) => {
            if (Counter.id.indexOf(CounterId) > -1) {
                return false;
            }
            return true
        })
    }
    getState() {
        if (this.state !== null) localStorage.setItem("counters", JSON.stringify(this.state))
        /**
         * Always return deep copy of state 
         * and not the same object again, 
         * else your components won't re-render  
         */
        return this.state !== null?[...this.state]:[]
    }

}
/**
 * Prepares action data for dispatch
 */
export class CounterActionDispatcher {
    private storedDispatch: Function
    /**
     * Stores dispatch prop for action calls
     * @param dispatch dispatch argument received in mapDispatchToProps
     */
    constructor(dispatch: Function) {
        this.storedDispatch = dispatch
    }
    //----- action methods -----//
    createCounter(text: string) {
        const Counter: CounterStateType = {
            id: `Counter-${Math.ceil(Math.random() * 10000)}-${(new Date()).getTime()}`,
            text,
            count: 0
        };
        this.storedDispatch({
            type: CounterVerbs.CREATE_COUNTER,
            details: Counter
        })

    }
    updateCounter(id: string, increment: boolean, text: string) {
        this.storedDispatch({
            type: CounterVerbs.UPDATE_COUNTER,
            details: {
                id, increment, text
            }
        })
    }
    deleteCounter(id: string) {
        this.storedDispatch({
            type: CounterVerbs.DELETE_TODO,
            details: {
                id
            }
        })
    }
    //----- !action methods -----//

    /**
     * returns function list to return in mapDispatchToProps
     */
    getDispatchToPropsMap() {
        const { deleteCounter, createCounter, updateCounter } = this
        // remember to bind functions in returned object so that they don't lose access to current context 
        return { createCounter: createCounter.bind(this), updateCounter: updateCounter.bind(this), deleteCounter: deleteCounter.bind(this) }
    }
}