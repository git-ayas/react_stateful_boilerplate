import { Component } from 'react'
import { connect } from 'react-redux'
import { CounterActionDispatcher } from "../../state/CounterState";
const emojis = [
    "\u{1f60c}", "\u{1f632}", "\u{1f622}", "\u{1f636}", "\u{1f640}",
    "\u{1f60a}", "\u{1f607}", "\u{1f629}", "\u{1f627}", "\u{1f64d}",
    "\u{1f634}", "\u{1f637}", "\u{1f60b}", "\u{1f630}", "\u{1f633}",
    "\u{1f647}", "\u{1f61f}", "\u{1f60a}", "\u{1f624}", "\u{1f623}",
    "\u{1f618}", "\u{1f61c}", "\u{1f63d}", "\u{1f61b}", "\u{1f64b}",
    "\u{1f60e}", "\u{1f60b}", "\u{1f64f}", "\u{1f61d}", "\u{1f644}"
]
export class AddCounter extends Component<any, { currentCounterText: string }> {
    constructor(props: any) {
        super(props)
        this.state = { currentCounterText: `${this.getRandomText()} ` }
    }
    render() {
        return (
            <div>
                <input type="text" name="CounterText" id=""
                    value={this.state.currentCounterText}
                    onChange={(evObj) => { this.setState({ currentCounterText: evObj.target.value }) }}
                />
                <button className="btn-clear" onClick={this.create.bind(this)}>🔼</button>
            </div>
        )
    }
    reset() {
        this.setState({ currentCounterText: `${this.getRandomText()} ` })
    }
    getRandomText(){
        return emojis[Math.floor(Math.random() * emojis.length)]
    }
    create() {
        this.props.createCounter(this.state.currentCounterText)
        this.reset()
    }
}

const mapStateToProps = (state: any) => ({
})


const mapDispatchToProps = (dispatch: Function) => {
    const { createCounter } = (new CounterActionDispatcher(dispatch)).getDispatchToPropsMap()
    return { createCounter }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddCounter)
