import {createStore,combineReducers} from 'redux'
import todos from './TodoState'

export default createStore(combineReducers({todos}))