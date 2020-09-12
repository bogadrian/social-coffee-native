import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from '../users.types'
import {userLoginSuccess, userLoginFailure} from '../reducer.actions'
import {makeCallLoginWithUser, makeCallLoginProvider} from '../../apis/loginApi'


export function* setLoginSuccessProvider (user: any) {
  try {
       const userSignedUp = yield call(makeCallLoginProvider, user)
    
    yield put(userLoginSuccess(userSignedUp))
        
  }catch (error) {
      
      yield put(userLoginFailure(error))
  }
   
}

export  function* setLoginSuccessUser(user: any) { 

    try {
          const userSignedUp = yield call(makeCallLoginWithUser, user)
   
          if (userSignedUp) {
            yield put(userLoginSuccess(userSignedUp))
        }
    }catch (error) {
        yield put(userLoginFailure(error))
    }
      
}


function* loginStartUser() {
  
    yield takeLatest(IUsersTypes.START_LOGIN_USER, setLoginSuccessUser)
 }
 
function* loginStartProvider() {
    
    yield takeLatest(IUsersTypes.START_LOGIN_PROVIDER, setLoginSuccessProvider)
 }
 
 export function* startLogin  () {
     yield all([ call(loginStartUser), call(loginStartProvider)])
 }