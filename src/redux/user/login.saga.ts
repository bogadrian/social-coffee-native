import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from './users.types'
import {loginSuccessUser, loginFailureUser, loginSuccessProvider, loginFailureProvider } from './login.actions'
import {makeCallLoginWithUser, makeCallLoginProvider} from '../apis/loginApi'


export function* setLoginSuccessProvider (user: any) {
    try {
        const userSignedUp = yield call(makeCallLoginProvider, user)
        
     
        if (userSignedUp) {
            yield put(loginSuccessProvider(userSignedUp))
        }
        
    }catch (err) {
        yield put(loginFailureUser(err))
        yield put(loginFailureProvider(err))
    }
}

export  function* setLoginSuccessUser(user: any) {
    try {
        const userSignedUp = yield call(makeCallLoginWithUser, user)
        
        if (userSignedUp) {
            yield put(loginSuccessUser(userSignedUp))
        }else {
            yield call(setLoginSuccessProvider, user)
        }
    }catch (err) {
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