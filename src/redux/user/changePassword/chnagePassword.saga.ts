import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';

import {
  changePasswordSuccess,
  changePasswordFailure
} from './changePassword.actions';

import { makeCallToServerWithUserNewPassword } from '../../apis/changePassword';

function* setChange(userData: any) {
  try {
    let response: any;

    if (userData.userData.u === 'user') {
      response = yield call(makeCallToServerWithUserNewPassword, userData);
    }
    yield put(changePasswordSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(changePasswordFailure(error));
  }
}

function* changeStart() {
  yield takeLatest(IUsersTypes.START_CHANGE_PASSWORD, setChange);
}

export function* startSagaChangePassword() {
  yield all([call(changeStart)]);
}
