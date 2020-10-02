import { takeLatest, put, call, all } from 'redux-saga/effects';

import { IUsersTypes } from '../users.types';

import {
  updateMeSuccess,
  updateMeFailure,
  uploadSuccess,
  uploadFailure
} from './update.actions';
import {
  makeCallToServerWithUserData,
  makeCallToServerWithActivityData,
  makeCallToServerPdf
} from '../../apis/updateMe';

interface IUpdateValues {
  name: string;
  description: string;
  images: string[];
  u?: string;
  vat?: string;
}

interface IUploadValues {
  pdf: any;
}

interface ISagaValues {
  userData: IUpdateValues;
  type: IUsersTypes;
}

interface ISagaUploadValues {
  userData: IUploadValues;
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

function* setUpload(pdf: ISagaUploadValues) {
  try {
    const response = yield call(makeCallToServerPdf, pdf);
    console.log('222222222222222222222222222222', response);
    yield put(uploadSuccess(response));
  } catch (err) {
    yield put(uploadFailure(err));
  }
}

function* updateStart() {
  yield takeLatest(IUsersTypes.START_UPDATE_ME, setUpdate);
}

function* uploadStart() {
  yield takeLatest(IUsersTypes.UPLOAD_START, setUpload);
}

export function* startSagaUpdate() {
  yield all([call(updateStart), call(uploadStart)]);
}
