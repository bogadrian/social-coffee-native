import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';

import { updateMeSuccess, updateMeFailure } from './update.actions';
import {
  makeCallToServerWithUserData,
  makeCallToServerWithActivityData
} from '../../apis/updateMe';

function* setUpdate(userData: any) {
  try {
    let response: any;

    if (userData.userData.u === 'user') {
      response = yield call(makeCallToServerWithUserData, userData);
    }

    if (userData.userData.u === 'coffee-provider') {
      response = yield call(makeCallToServerWithActivityData, userData);
    }
    yield put(updateMeSuccess(response));
  } catch (error) {
    console.log(error);
    put(updateMeFailure(error));
  }
}

function* updateStart() {
  yield takeLatest(IUsersTypes.START_UPDATE_ME, setUpdate);
}

export function* startSagaUpdate() {
  yield all([call(updateStart)]);
}
