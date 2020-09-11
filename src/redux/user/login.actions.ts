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

