import {IUsersTypes} from './users.types'

export const loginStartUser = (user: any) => {
    return {
        type: IUsersTypes.START_LOGIN_USER,
        user
    }
}
export const loginStartProvider = (user: any) => {
    return {
        type: IUsersTypes.START_LOGIN_PROVIDER,
        user
    }
}

export const loginSuccessUser = (user: any) => {
    return {
        type: IUsersTypes.LOGIN_SUCCESS_USER,
        user
    }
}

export const loginFailureUser = (error: string) => {
    return {
        type: IUsersTypes.LOGIN_FALIURE_USER,
        payload: error
    }
}
export const loginSuccessProvider = (user: any) => {
    return {
        type: IUsersTypes.LOGIN_SUCCESS_PROVIDER,
        user
    }
}

export const loginFailureProvider = (error: string) => {
    return {
        type: IUsersTypes.LOGIN_FALIURE_PROVIDER,
        error
    }
}