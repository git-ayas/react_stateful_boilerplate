import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getStopwatchActionDispatcher, StopwatchVerbNames } from "../../state/StopwatchState";
function AddStopwatch() {
    const [CurrentStopwatchText, setCurrentStopwatchText] = useState("")
    const CreateActionCreator = getStopwatchActionDispatcher(StopwatchVerbNames.CREATE)
    const dispatch = useDispatch()
    const createStopwatch = (stopwatchName: string) => { dispatch(CreateActionCreator ? CreateActionCreator(stopwatchName) : () => { }) }
    return (
        <div>
            <input type="text" name="todoText" id=""
                value={CurrentStopwatchText}
                onChange={(evObj) => { setCurrentStopwatchText(evObj.target.value) }}
            />
            <button className="btn-clear" onClick={() => createStopwatch(CurrentStopwatchText)}>🔼</button>
        </div>
    )
}

export default AddStopwatch
