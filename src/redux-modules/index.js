import { combineReducers } from 'redux';
import userReducer, { usersSaga } from './user';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  user: userReducer
});

export function* rootSaga() {
  yield all([usersSaga()])
}

export default rootReducer;