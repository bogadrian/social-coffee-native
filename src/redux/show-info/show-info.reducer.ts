
import {IInfoTypes} from './show-info.types'
import {toggleInfoAction} from './show-info.actions'

const  INITIAL_STATE = {
    info: false
}

export interface  IIsInfo {
    info: boolean
}
const infoReducer = (state: IIsInfo = INITIAL_STATE, action: toggleInfoAction) => {
    switch (action.type) {
        case IInfoTypes.TOGGLE_INFO : 
          return { 
              ...state,
              info: !state.info
          }
        default: return state
    }
}

export default infoReducer