import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';
import { userGetMeSuccess, userGetMeFailure } from '../reducer.actions';

import { getUserToken, getProviderToken } from '../../apis/getUser';

function* takeNewRoute() {
  try {
    const user = yield call(getProviderToken);
    yield put(userGetMeSuccess(user));
  } catch (error) {
    yield put(userGetMeFailure(error));
  }
}

function* setSuccessGet() {
  try {
    const user = yield call(getUserToken);
    yield put(userGetMeSuccess(user));
  } catch (error) {
    yield call(takeNewRoute);
    yield put(userGetMeFailure(error));
  }
}

function* setStartGet() {
  yield takeLatest(IUsersTypes.START_GET_USER, setSuccessGet);
}

export function* getUser() {
  yield all([call(setStartGet)]);
}
