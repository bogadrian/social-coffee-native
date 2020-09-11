import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from './users.types'
import {userSuccess, userFailure,  } from './reducer.actions'
import {makeCallLoginWithUser, makeCallLoginProvider} from '../apis/loginApi'


export function* setLoginSuccessProvider (user: any) {
    try {
        const userSignedUp = yield call(makeCallLoginProvider, user)
        
     
        if (userSignedUp) {
            yield put(userSuccess(userSignedUp))
        }
        
    }catch (err) {
        yield put(userFailure(err))
       
    }
}

export  function* setLoginSuccessUser(user: any) { 
        const userSignedUp = yield call(makeCallLoginWithUser, user)
        
        if (userSignedUp) {
            yield put(userSuccess(userSignedUp))
        }else {
            yield call(setLoginSuccessProvider, user)
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