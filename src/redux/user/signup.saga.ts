import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from './users.types'
import {signupSuccessUser, signupFailureUser, signupSuccessProvider, signupFailureProvider } from './signup.actions'
import {makeCallSignupWithUser, makeCallSignupProvider} from '../apis/signupApi'


export function* setSignupSuccessProvider (user: any) {
    try {
        const userSignedUp = yield call(makeCallSignupProvider, user)
        
        console.log('ssssfffgggh', userSignedUp)
        if (userSignedUp) {
            yield put(signupSuccessProvider(userSignedUp))
        }
        
    }catch (err) {
        yield put(signupFailureUser(err))
        yield put(signupFailureProvider(err))
    }
}

export  function* setSignupSuccessUser(user: any) {   
    try {
        const userSignedUp = yield call(makeCallSignupWithUser, user)
        
        if (userSignedUp) {
            yield put(signupSuccessUser(userSignedUp))
        }else {
            yield call(setSignupSuccessProvider, user)
        }
    }catch (err) {
       yield call(setSignupSuccessProvider, user)
    }
}


function* signupStartUser() {
    yield takeLatest(IUsersTypes.START_SIGNUP_USER, setSignupSuccessUser)
 }
 
function* signupStartProvider() {
    yield takeLatest(IUsersTypes.START_SIGNUP_PROVIDER, setSignupSuccessProvider)
 }
 
 export function* startSignup  () {
     yield all([ call(signupStartUser), call(signupStartProvider)])
 }