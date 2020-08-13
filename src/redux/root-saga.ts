import { all, call } from 'redux-saga/effects';


function* rootSaga() {
  yield all([
  call(/*some saga here*/)
  ])
}

export default rootSaga;
