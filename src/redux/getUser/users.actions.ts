import {IUsersTypes} from './users.types'

export interface UserAction  {
    type: IUsersTypes;
    user?: {};
    provider?: {};
    error?: string
}

export interface StartActionType {
    type: IUsersTypes,
    error?: string
}

export const  userGetStart = (): StartActionType =>  {
    
   return {type: IUsersTypes.START_GET_USER}
}

export const providerGetSuccess = (user: {}): UserAction =>  {
    return { type: IUsersTypes.SUCCESS_PROVIDER_GET, user}
}

export const providerGetFailure = (error: string): UserAction =>  {
    return { type: IUsersTypes.FAILURE_PROVIDER_GET, error}
}

export const userGetSuccess = (user: {}): UserAction =>  {
    return { type: IUsersTypes.SUCCESS_PROVIDER_GET, user}
}

export const userGetFailure = (error: string): UserAction =>  {
    return { type: IUsersTypes.FAILURE_USER_GET, error}
}
