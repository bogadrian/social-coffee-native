import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';
import { IPasswordValues } from './changePassword.actions';
import { IUserType } from '../../../types/user.types';

interface IData {
  type: IUsersTypes;
  userData: IPasswordValues;
}

import {
  changePasswordSuccess,
  changePasswordFailure
} from './changePassword.actions';

import {
  makeCallToServerWithUserNewPassword,
  makeCallToServerWithProviderNewPassword
} from '../../apis/changePassword';

function* setChange(userData: IData) {
  try {
    let response: IUserType | undefined;

    if (userData.userData.u === 'user') {
      response = yield call(makeCallToServerWithUserNewPassword, userData);
    }

    if (userData.userData.u === 'coffee-provider') {
      response = yield call(makeCallToServerWithProviderNewPassword, userData);
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
