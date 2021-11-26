import { combineReducers } from 'redux';
import userReducer, { usersSaga } from './user';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({
  user: userReducer,
});

export function* rootSaga() {
  yield all([usersSaga()]);
}

// export function* rootSaga() {
//   yield all([fork(usersSaga)]);
// }

export default rootReducer;
