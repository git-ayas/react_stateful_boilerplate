import {createStore,combineReducers} from 'redux'
import todos from './TodoState'
import counters from "./CounterState"
import stopwatches from "./StopwatchState"

export default createStore(combineReducers({todos,counters,stopwatches}))