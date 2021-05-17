/**
 * Approach 2: horizontal partitioning of entities. Each verb is its own instance with the following primitives
 *  - action types/name
 *  - action dispatcher function (to be used by components to compose redux actions)
 *  - action parser function (to be used by reducers to immute states) 
 * Each verb is added to a collection list to be searched by reducer. 
 */

import { Verb } from "./StateVerbTypes";

export enum StopwatchVerbNames {
    CREATE = "CREATE_STOPWATCH",
    START = "START_STOPWATCH",
    STOP = "STOP_STOPWATCH",
    DELETE = "DELETE_STOPWATCH"
}
const StopwatchVerbList: Array<Verb> = []

export interface StopwatchStateEntryType {
    id: string;
    text: string;
    start: number;
    stop: number;
    log: Array<number>;
}



class CreateStopwatch extends Verb<StopwatchVerbNames, StopwatchStateEntryType, Array<StopwatchStateEntryType>>{
    constructor(VerbName: StopwatchVerbNames) {
        super(VerbName);
        this.actionDispatcher = this.actionDispatcher.bind(this)
        this.actionParser = this.actionParser.bind(this)
    }


    actionDispatcher(name: StopwatchVerbNames): { type: StopwatchVerbNames; details: StopwatchStateEntryType; } {
        const { type } = this
        const stopWatchData: StopwatchStateEntryType = {
            id: `todo-${Math.ceil(Math.random() * 10000)}-${(new Date()).getTime()}`,
            text: name,
            start: 0,
            stop: 0,
            log: []

        }
        return { type, details: stopWatchData }
    }
    actionParser = (state: Array<StopwatchStateEntryType>, details: StopwatchStateEntryType) => {
        let intermediateState = [...state]
        intermediateState.push(details)
        return intermediateState

    }

}

StopwatchVerbList.push(new CreateStopwatch(StopwatchVerbNames.CREATE))

class DeleteStopwatch extends Verb<StopwatchVerbNames, StopwatchStateEntryType, Array<StopwatchStateEntryType>>{
    constructor(VerbName: StopwatchVerbNames) {
        super(VerbName);
        this.actionDispatcher = this.actionDispatcher.bind(this)
        this.actionParser = this.actionParser.bind(this)
    }


    actionDispatcher(id:string): { type: StopwatchVerbNames; details: { id: string }; } {
        const { type } = this
        return { type, details: {id} }
    }
    actionParser = (state: Array<StopwatchStateEntryType>, details: { id: string }) => {
        let intermediateState = [...state]
        const deleteIndex = intermediateState.findIndex((stopwatch) => stopwatch.id === details.id)
        intermediateState.splice(deleteIndex, 1)
        return intermediateState

    }

}
StopwatchVerbList.push(new DeleteStopwatch(StopwatchVerbNames.DELETE))

class StartStopwatch extends Verb<StopwatchVerbNames, StopwatchStateEntryType, Array<StopwatchStateEntryType>>{
    constructor(VerbName: StopwatchVerbNames) {
        super(VerbName);
        this.actionDispatcher = this.actionDispatcher.bind(this)
        this.actionParser = this.actionParser.bind(this)
    }


    actionDispatcher(id:string): { type: StopwatchVerbNames; details: { id: string }; } {
        const { type } = this
        return { type, details: {id} }
    }
    actionParser = (state: Array<StopwatchStateEntryType>, details: { id: string }) => {
        let intermediateState = [...state]
        const StopwatchIndex = intermediateState.findIndex((stopwatch) => stopwatch.id === details.id)
        intermediateState[StopwatchIndex].start = Date.now()
        return intermediateState

    }

}
StopwatchVerbList.push(new StartStopwatch(StopwatchVerbNames.START))
class StopStopwatch extends Verb<StopwatchVerbNames, StopwatchStateEntryType, Array<StopwatchStateEntryType>>{
    constructor(VerbName: StopwatchVerbNames) {
        super(VerbName);
        this.actionDispatcher = this.actionDispatcher.bind(this)
        this.actionParser = this.actionParser.bind(this)
    }


    actionDispatcher(id:string): { type: StopwatchVerbNames; details: { id: string }; } {
        const { type } = this
        return { type, details: {id} }
    }
    actionParser = (state: Array<StopwatchStateEntryType>, details: { id: string }) => {
        let intermediateState = [...state]
        const StopwatchIndex = intermediateState.findIndex((stopwatch) => stopwatch.id === details.id)
        intermediateState[StopwatchIndex].stop = Date.now()
        return intermediateState

    }

}
StopwatchVerbList.push(new StopStopwatch(StopwatchVerbNames.STOP))



export default function reducer(state: Array<StopwatchStateEntryType> = [], action: { type: StopwatchVerbNames, details: any }) {
    const currentVerb = StopwatchVerbList.find((verbInstance) => {
        return verbInstance.type === action.type
    })

    return currentVerb ?
        currentVerb.actionParser(state, action.details) as Array<StopwatchStateEntryType>
        : state
}

export function getStopwatchActionDispatcher(ActionName: StopwatchVerbNames) {
    const currentVerb = StopwatchVerbList.find((verbInstance) => {
        return verbInstance.type === ActionName
    })
    return currentVerb?.actionDispatcher

}
