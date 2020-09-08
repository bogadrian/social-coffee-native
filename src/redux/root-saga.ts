import { all, call } from 'redux-saga/effects';

import {infoSet} from './show-info/show-saga'
import { getUser } from './getUser/users.saga'

function* rootSaga() {
  yield all([
  call(infoSet),
  call(getUser)
  ])
}

export default rootSaga;
