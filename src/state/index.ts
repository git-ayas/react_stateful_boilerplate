import {createStore,combineReducers} from 'redux'
import todos from './TodoState'
import counters from "./CounterState"

export default createStore(combineReducers({todos,counters}))