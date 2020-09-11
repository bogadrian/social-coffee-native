import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from './users.types'
import {userSuccess, userFailure } from './reducer.actions'
import {makeCallSignupWithUser, makeCallSignupProvider} from '../apis/signupApi'


export function* setSignupSuccessProvider (user: any) {
    try {
        const userSignedUp = yield call(makeCallSignupProvider, user)
        
    
        if (userSignedUp) {
            yield put(userSuccess(userSignedUp))
        }
        
    }catch (err) {
        yield put(userFailure(err))
        
    }
}

export  function* setSignupSuccessUser(user: any) {   
  
        const userSignedUp = yield call(makeCallSignupWithUser, user)
        
        if (userSignedUp) {
            yield put(userSuccess(userSignedUp))
        }else {
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