import { all, call } from 'redux-saga/effects';

import { infoSet } from './show-info/show-saga';
import { rootUserSaga } from './user/userRoot.saga';

function* rootSaga() {
  yield all([call(infoSet), call(rootUserSaga)]);
}

export default rootSaga;
