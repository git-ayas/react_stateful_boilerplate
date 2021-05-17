import AddCounter from './AddCounter'
import ListCounters from './ListCounters'

function Counters() {
    return (
        <div className="App-col">
            <p>
                Counters 
            </p>
            <ListCounters key={`TodoList-${(new Date()).getTime()}`}/>
            <AddCounter/>
        </div>
    )
}

export default Counters
