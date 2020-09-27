import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';
import { userGetMeSuccess, userGetMeFailure } from '../reducer.actions';

import { getUserToken, getProviderToken } from '../../apis/getUser';
import { IUserType } from '../../../types/user.types';

function* takeNewRoute() {
  try {
    const user: IUserType = yield call(getProviderToken);

    yield put(userGetMeSuccess(user));
  } catch (error) {
    yield put(userGetMeFailure(error));
  }
}

function* setSuccessGet() {
  try {
    const user: IUserType = yield call(getUserToken);

    if (user) {
      yield put(userGetMeSuccess(user));
    } else {
      yield call(takeNewRoute);
    }
  } catch (error) {
    console.log(error);
  }
}

function* setStartGet() {
  yield takeLatest(IUsersTypes.START_GET_USER, setSuccessGet);
}

export function* getUser() {
  yield all([call(setStartGet)]);
}
