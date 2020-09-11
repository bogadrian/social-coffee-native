import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from './users.types'
import { userSuccess, userFailure} from './reducer.actions'

import { getUserToken, getProviderToken } from '../apis/getUser'

function* takeNewRoute () {
  try { 
      const user = yield call(getProviderToken)
    
      if (user) {
        yield put(userSuccess(user))
        }
      }catch (err) {
        yield put(userFailure(err))
      }
}

 function* setSuccessGet () {

    const user = yield call(getUserToken)
        if (user) { 
          yield  put(userSuccess(user))
        }else {
          yield call(takeNewRoute)
        } 
 }

 function* setStartGet () {
   yield takeLatest(IUsersTypes.START_GET_USER, setSuccessGet)
}

export function* getUser  () {
    yield all([ call(setStartGet)])
}