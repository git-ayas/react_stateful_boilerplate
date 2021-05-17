import AddStopwatch from './AddStopwatch'
import ListStopwatches from './ListStopwatches'
function Stopwatches() {
    return (
        <div className="App-col">
            <p>
                Stopwatches 
            </p>
            <ListStopwatches/>
            <AddStopwatch/>
        </div>
    )
}

export default Stopwatches