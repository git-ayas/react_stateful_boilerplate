import { Component } from 'react'
import { connect } from 'react-redux'
import { CounterActionDispatcher, CounterStateType } from '../../state/CounterState'

/**
 * Pro-tip: If you are using any form of state management 
 * then try your best to keep your connected component from 
 * having its own state especiall in cases where you just have 
 * to simply display data.
 */
class ListCounters extends Component<any, any> {

    render() {
        const counterItems = this.props.counters.map ? this.props.counters.map((counter: CounterStateType) => (
            <li className="counter-list-item" key={"counter-list-item-" + (new Date()).getTime() + Math.random()}>
                <div className="counter-container">
                    <button className="btn-clear counter-increment" onClick={() => { this.updateCounter(counter, true) }}>{"➕"}</button>
                    {counter.text} [{counter.count}]
                    {/* <input className="counter-count" type="text" value={counter.count} disabled /> */}
                    <button className="btn-clear counter-decrement" onClick={() => { this.updateCounter(counter, false) }}>{"➖"}</button>
                </div>
                <small><button className="btn-clear .counter-delete-button" onClick={() => { this.deleteCounter(counter) }}>🗑️</button></small>
            </li>
        )) : []

        return (
            <ul className="counter-list" key={"counter-list-" + (new Date()).getTime()}>{counterItems}</ul>
        )
    }
    updateCounter(counter: CounterStateType, toIncrement: boolean) {
        this.props.updateCounter(counter.id, toIncrement, counter.text)

    }
    deleteCounter(counter: CounterStateType) {
        this.props.deleteCounter(counter.id)
    }
}


const mapStateToProps = (state: any) => {
    const { counters } = state
    return { counters }

}

const mapDispatchToProps = (dispatch: Function) => {
    return (new CounterActionDispatcher(dispatch)).getDispatchToPropsMap()
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCounters)
