import {IInfoTypes} from './show-info.types'
import {infoAction} from './show-info.actions'

export interface IState {
    info: boolean,
    err: string | null
}
let  INITIAL_STATE = {
    info: true,
    err: null
}; 

const infoReducer = (state: IState = INITIAL_STATE, action: infoAction) => {  
  
    switch (action.type) { 
         case IInfoTypes.INFO_SUCCESS_GET :
          return { 
             ...state,
             info: false,
             err: null  
          }
         case IInfoTypes.INFO_FAILURE_GET: 
          return { 
              ...state,
              err: action.err
          }
        default: return state
    }
}

export default infoReducer