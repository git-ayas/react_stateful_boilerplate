import AddCounter from './views/counter/AddCounter'
import ListCounters from './views/counter/ListCounters'

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
