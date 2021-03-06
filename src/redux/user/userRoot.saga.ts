import { all, call } from 'redux-saga/effects';

import { getUser } from './getMe/users.saga';
import { startSignup } from './signup/signup.saga';
import { startLogin } from './login/login.saga';
import { startResetSaga } from './resetPassword/reset.saga';
import { startSagaUpdate } from './updateMe/update.saga';
import { startSagaChangePassword } from './changePassword/chnagePassword.saga';

export function* rootUserSaga() {
  yield all([
    call(getUser),
    call(startSignup),
    call(startLogin),
    call(startResetSaga),
    call(startSagaUpdate),
    call(startSagaChangePassword)
  ]);
}

export default rootUserSaga;
