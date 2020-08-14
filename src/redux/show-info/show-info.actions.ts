import {IInfoTypes} from './show-info.types'

export interface infoAction  {
    type: IInfoTypes,
}

export const  closeInfo = () => {
   return {type: IInfoTypes.CLOSE_INFO}
}

export const openInfo = () => {
    return { type: IInfoTypes.OPEN_INFO}
}