import {createStore,combineReducers} from 'redux'
import stopwatches from "./StopwatchState"

export default createStore(combineReducers({stopwatches}))