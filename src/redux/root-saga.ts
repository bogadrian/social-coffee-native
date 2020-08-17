import { all, call } from 'redux-saga/effects';

import {infoSet} from './show-info/show-saga'

function* rootSaga() {
  yield all([
  call(infoSet),
  ])
}

export default rootSaga;
