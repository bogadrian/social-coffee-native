import {IUsersTypes} from './users.types'
import {UserAction} from './users.actions'

export interface IState {
    user: any;
    err: string | null
}
let  INITIAL_STATE = {
    user: null,
    err: null
}; 

export const getUserReducer = (state: IState = INITIAL_STATE, action: UserAction) => {
    switch (action.type) {
        case IUsersTypes.SUCCESS_USER_GET: 
        case IUsersTypes.SUCCESS_PROVIDER_GET:
        return { 
                ...state,
                user: action.user,
                err: null
            }
        case IUsersTypes.FAILURE_USER_GET:
        case IUsersTypes.FAILURE_PROVIDER_GET:
            return { 
                ...state,
                user: null,
                err: action.error
            }
        default: return state;    
    }
    
}

export default getUserReducer