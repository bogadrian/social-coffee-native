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

export const userReducer = (state: IState = INITIAL_STATE, action: UserAction) => {
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
        case IUsersTypes.SIGNUP_SUCCESS_USER:
        case IUsersTypes.SIGNUP_SUCCESS_PROVIDER:
                return {
                ...state,
                user: action.user,
                err: null
                }
        case IUsersTypes.SIGNUP_FALIURE_USER:
        case IUsersTypes.SIGNUP_FALIURE_PROVIDER:
                return { 
                ...state,
                user: null,
                err: action.error
                } 
        case IUsersTypes.LOGIN_SUCCESS_USER:
        case IUsersTypes.LOGIN_SUCCESS_PROVIDER:
                return {
                    ...state,
                    user: action.user,
                    err: null
                }
        case IUsersTypes.LOGIN_FALIURE_USER:
        case IUsersTypes.LOGIN_FALIURE_PROVIDER:
                return { 
                    ...state,
                    user: null,
                    err: action.error
                }    
        default: return state;    
    }
    
}

export default userReducer