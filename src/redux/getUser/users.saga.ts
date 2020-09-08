import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from './users.types'
import { userGetSuccess, userGetFailure, providerGetSuccess, providerGetFailure} from './users.actions'

import { getUserToken, getProviderToken } from '../apis/getUser'

function* takeNewRoute () {
  try { 
      const user = yield call(getProviderToken)
      
      if (user) {
        yield put(providerGetSuccess(user))
      }
      
      }catch (err) {
        yield put(providerGetFailure(err))
        yield put(userGetFailure(err))
      }
}

 function* setSuccessGet () {
 try {
    const user = yield call(getUserToken)
       
        if (user) { 
          yield  put(userGetSuccess(user))
        }
 }catch (err) {
        yield call(takeNewRoute)
  }     
 }

 function* setStartGet () {
   yield takeLatest(IUsersTypes.START_GET_USER, setSuccessGet)
}

export function* getUser  () {
    yield all([ call(setStartGet)])
}