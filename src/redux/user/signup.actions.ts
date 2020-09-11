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

export const signupSuccessUser = (user: any) => { 
     console.log('sssssssssssss', user)
    return {
        type: IUsersTypes.SIGNUP_SUCCESS_USER,
        user
    }
}

export const signupFailureUser = (error: string) => {
    return {
        type: IUsersTypes.SIGNUP_FALIURE_USER,
        payload: error
    }
}
export const signupSuccessProvider = (user: any) => {
    return {
        type: IUsersTypes.SIGNUP_SUCCESS_PROVIDER,
        user
    }
}

export const signupFailureProvider = (error: string) => {
    return {
        type: IUsersTypes.SIGNUP_FALIURE_PROVIDER,
        error
    }
}