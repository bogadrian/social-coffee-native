import {IInfoTypes} from './show-info.types'

export interface toggleInfoAction  {
    type: IInfoTypes

}

export const  startToggleInfo = () => {
   return {type: IInfoTypes.TOGGLE_INFO}
}