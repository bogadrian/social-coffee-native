import {IInfoTypes} from './show-info.types'

export interface infoAction  {
    type: IInfoTypes,
    info: boolean | string,
    err?: string
}

export interface IInfo {
    info: boolean | string
}

export interface ActionType {
    type: IInfoTypes,
    err?: string
}

export const  infoGetStart = (): ActionType =>  {
   return {type: IInfoTypes.START_INFO_GET}
}

export const infoGetSuccess = (): ActionType =>  {
    return { type: IInfoTypes.INFO_SUCCESS_GET}
}

export const infoGetFailure = (err: string): ActionType =>  {
    return { type: IInfoTypes.INFO_FAILURE_GET, err}
}