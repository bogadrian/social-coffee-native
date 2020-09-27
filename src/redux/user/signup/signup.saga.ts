import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';
import { userSignupSuccess, userSignupFailure } from '../reducer.actions';
import {
  makeCallSignupWithUser,
  makeCallSignupProvider
} from '../../apis/signupApi';

interface IValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: string;
}

interface ISagaValues {
  user: IValues;
  type: IUsersTypes;
}

export function* setSignupSuccessProvider(user: ISagaValues) {
  try {
    const userSignedUp = yield call(makeCallSignupProvider, user);

    yield put(userSignupSuccess(userSignedUp));
  } catch (error) {
    yield put(userSignupFailure(error));
  }
}

export function* setSignupSuccessUser(user: ISagaValues) {
  try {
    const userSignedUp = yield call(makeCallSignupWithUser, user);

    yield put(userSignupSuccess(userSignedUp));
  } catch (error) {
    yield put(userSignupFailure(error));
  }
}

function* signupStartUser() {
  yield takeLatest(IUsersTypes.START_SIGNUP_USER, setSignupSuccessUser);
}

function* signupStartProvider() {
  yield takeLatest(IUsersTypes.START_SIGNUP_PROVIDER, setSignupSuccessProvider);
}

export function* startSignup() {
  yield all([call(signupStartUser), call(signupStartProvider)]);
}
