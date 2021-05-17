import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStopwatchActionDispatcher, StopwatchStateEntryType, StopwatchVerbNames } from '../../state/StopwatchState'
function ListStopwatches() {
    const [Now, setNow] = useState(Date.now());
    setInterval(() => setNow(Date.now()), 200)
    const stopwatches = useSelector((state: any) => state.stopwatches)
    // Get action creators
    const DeleteActionCreator = getStopwatchActionDispatcher(StopwatchVerbNames.DELETE)
    const StartActionCreator = getStopwatchActionDispatcher(StopwatchVerbNames.START)
    const StopActionCreator = getStopwatchActionDispatcher(StopwatchVerbNames.STOP)
    // store dispatch
    const dispatch = useDispatch()
    //send actions with dispatch
    const deleteStopwatch = (id: string) => { dispatch(DeleteActionCreator ? DeleteActionCreator(id) : () => { }) }
    const startStopwatch = (id: string) => { dispatch(StartActionCreator ? StartActionCreator(id) : () => { }) }
    const stopStopwatch = (id: string) => { dispatch(StopActionCreator ? StopActionCreator(id) : () => { }) }

    //millisecond time formatter
    const toHHMMSSms = (millisecondtime: number) => new Date(millisecondtime).toISOString().substr(11, 12)
    const stopwatchList = stopwatches.map((stopwatch: StopwatchStateEntryType) => {
        return (
            <li key={stopwatch.id} className="stopwatch-list-item">
                <div className="stopwatch-container">
                    {stopwatch.stop > 0 ? 
                    null 
                    : <button className="btn-clear stopwatch-start-stop-toggle"
                        onClick={() => {
                            if (stopwatch.start > 0) {
                                stopStopwatch(stopwatch.id)
                            } else {
                                startStopwatch(stopwatch.id)
                            }
                        }}
                    >
                        {stopwatch.start > 0 ? "⏹️" : "▶️"}
                    </button>}
                    {stopwatch.text} [{stopwatch.start > 0 ? (stopwatch.stop > 0 ? toHHMMSSms(stopwatch.stop - stopwatch.start) : toHHMMSSms(Now - stopwatch.start)) : (<small>Not started</small>)}]
                    {/* {
                        stopwatch.stop > 0 ? <small>stopped</small>
                            : (
                                stopwatch.start > 0 ?
                                    <button className="btn-clear stopwatch-log" onClick={() => { }}>{"⏲️"}</button>
                                    : null
                            )
                    } */}

                </div>
                <small><button className="btn-clear .counter-delete-button" onClick={() => deleteStopwatch(stopwatch.id)}>🗑️</button></small>
            </li>
        )

    })
    return (
        <div>
            <ol>
                {stopwatchList}
            </ol>
        </div>
    )
}

export default ListStopwatches
