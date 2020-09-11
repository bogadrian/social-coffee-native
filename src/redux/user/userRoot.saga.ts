import { all, call } from 'redux-saga/effects';


import { getUser } from './users.saga'
import {startSignup} from './signup.saga'
import { startLogin } from './login.saga'

export function* rootUserSaga() {
  yield all([
  call(getUser),
  call(startSignup),
  call(startLogin)
  ])
}

export default rootUserSaga;