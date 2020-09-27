import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';

import { updateMeSuccess, updateMeFailure } from './update.actions';
import {
  makeCallToServerWithUserData,
  makeCallToServerWithActivityData
} from '../../apis/updateMe';

interface IUpdateValues {
  name: string;
  description: string;
  images: string[];
  u?: string;
  vat?: string;
}

interface ISagaValues {
  userData: IUpdateValues;
  type: IUsersTypes;
}

function* setUpdate(userData: ISagaValues) {
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
