import {IUsersTypes} from '../users.types'


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

