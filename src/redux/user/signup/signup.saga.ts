import { takeLatest, put, call, all } from 'redux-saga/effects';

import {IUsersTypes} from '../users.types'
import {userSignupSuccess, userSignupFailure } from '../reducer.actions'
import {makeCallSignupWithUser, makeCallSignupProvider} from '../../apis/signupApi'


export function* setSignupSuccessProvider (user: any) {
  
        const userSignedUp = yield call(makeCallSignupProvider, user)
        
        if (userSignedUp) {
            yield put(userSignupSuccess(userSignedUp))
        }else {
           yield put(userSignupFailure('No user was found')) 
        }
}

export  function* setSignupSuccessUser(user: any) {   
  
        const userSignedUp = yield call(makeCallSignupWithUser, user)
        
        if (userSignedUp) {
            yield put(userSignupSuccess(userSignedUp))
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