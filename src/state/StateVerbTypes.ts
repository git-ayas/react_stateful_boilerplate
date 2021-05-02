/* 
interface actionDispatch { type: any, details: any }
type actionDispatcher = (...args: any[]) => actionDispatch
type actionParser = <Type>(state: Type) => Type

export default interface Verb {
    actionType: any,
    actionDispatcher: actionDispatcher,
    actionParser: actionParser
} */

export abstract class Verb<ActionNameType = any,DetailType={},StateType={}>{
    type: ActionNameType
    abstract actionParser(state:StateType,details:DetailType):StateType
    constructor(name: ActionNameType) {
        this.type = name
    }
    abstract actionDispatcher(...arg: any[]): { type: ActionNameType, details: any }
}

