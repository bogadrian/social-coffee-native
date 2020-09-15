import { all, call } from 'redux-saga/effects';


import { getUser } from './getMe/users.saga'
import {startSignup} from './signup/signup.saga'
import { startLogin } from './login/login.saga'

export function* rootUserSaga() {
  yield all([
  call(getUser),
  call(startSignup),
  call(startLogin)
  ])
}

export default rootUserSaga;