/**
 * Approach 2: horizontal partitioning of entities. Each verb is its own instance with the following primitives
 *  - action types/name
 *  - action dispatcher function (to be used by components to compose redux actions)
 *  - action parser function (to be used by reducers to immute states) 
 * Each verb is added to a collection list to be searched by reducer. 
 */

import { Verb } from "./StateVerbTypes";

enum StopwatchVerbNames {
    CREATE = "CREATE_STOPWATCH"
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
        state.push(details)
        return state

    }

}

StopwatchVerbList.push(new CreateStopwatch(StopwatchVerbNames.CREATE))




export default function reducer(state: Array<StopwatchStateEntryType>, action: { type: StopwatchVerbNames, details: any }) {
    const currentVerb = StopwatchVerbList.find((verbInstance) => {
        return verbInstance.type === action.type
    })

    return [...(currentVerb ?
        currentVerb.actionParser(state, action.details) as Array<StopwatchStateEntryType>
        : state
    )]
}

export function getStopwatchActionDispatcher(ActionName: StopwatchVerbNames) {
    const currentVerb = StopwatchVerbList.find((verbInstance) => {
        return verbInstance.type === ActionName
    })
    return currentVerb?.actionDispatcher

}
