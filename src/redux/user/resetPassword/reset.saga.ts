import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';

import { ressetSuccessPassword, ressetFailurePassword } from './reset.actions';

import {
  makeCallResetPasswordUser,
  makeCallResetPasswordProvider
} from '../../apis/resetPassword';

function* setResetSuccessProvider(data: any) {
  try {
    const response = yield call(makeCallResetPasswordProvider, data);

    yield put(ressetSuccessPassword(response));
  } catch (error) {
    yield put(ressetFailurePassword(error));
  }
}

function* setResetSuccessUser(data: any) {
  try {
    const response = yield call(makeCallResetPasswordUser, data);

    if (response) {
      yield put(ressetSuccessPassword(response));
    } else {
      yield call(setResetSuccessProvider, data);
    }
  } catch (error) {
    console.log(error);
  }
}

function* startReset() {
  yield takeLatest(IUsersTypes.START_RESET_PASSWORD, setResetSuccessUser);
}

export function* startResetSaga() {
  yield all([call(startReset)]);
}
