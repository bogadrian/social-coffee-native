import { takeLatest, put, call, all } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage'


import {IInfoTypes} from './show-info.types'
import { infoGetSuccess, infoGetFailure} from './show-info.actions'

 function* setSuccessGet () {
    try {
        let result = yield AsyncStorage.getItem('Info')
 
        const res = JSON.parse(result)
        if (res === false) { 
          yield  put(infoGetSuccess())
        }
        }catch (err) {
         yield put(infoGetFailure(err))
        }
}

 function* setStartGet () {
   yield takeLatest(IInfoTypes.START_INFO_GET, setSuccessGet)
}

export function* infoSet  () {
    yield all([ call(setStartGet)])
}