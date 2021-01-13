import {createStore,combineReducers} from 'redux'
import todos from './TodoState/TodoState'

export default createStore(combineReducers({todos}))