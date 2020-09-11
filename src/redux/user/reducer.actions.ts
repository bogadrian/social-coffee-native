import {IUsersTypes} from './users.types'


export const signupStartUser = (user: any) => {
  
    return {
        type: IUsersTypes.START_SIGNUP_USER,
        user
    }
}
export const signupStartProvider = (user: any) => {
    return {
        type: IUsersTypes.START_SIGNUP_PROVIDER,
        user
    }
}

export const userSuccess = (user: any) => { 
    return {
        type: IUsersTypes.SUCCESS_USER_GET,
        user
    }
}

export const userFailure = (error: string) => {
    return {
        type: IUsersTypes.FAILURE_USER_GET,
        payload: error
    }
}
