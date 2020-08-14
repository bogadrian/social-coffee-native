
import {IInfoTypes} from './show-info.types'
import {infoAction} from './show-info.actions'

const  INITIAL_STATE = {
    info: true
}

export interface  IIsInfo {
    info: boolean
}
const infoReducer = (state: IIsInfo = INITIAL_STATE, action: infoAction) => {
    switch (action.type) {
        case IInfoTypes.CLOSE_INFO : 
          return { 
              ...state,
              info: false
          }
        case IInfoTypes.OPEN_INFO: 
          return { 
              ...state,
              info: true
          }
        default: return state
    }
}

export default infoReducer