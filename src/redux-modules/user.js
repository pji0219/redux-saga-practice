import axios from "axios";
import { call, put, takeEvery } from 'redux-saga/effects';

// 타입
const USER_LOADING_REQUEST = 'USER_LOADING_REQUEST';
const USER_LOADING_SUCCESS = 'USER_LOADING_SUCCESS';
const USER_LOADING_ERROR = 'USER_LOADING_ERROR';

// 액션 생성 함수
export const userFetch = () => ({
  type: USER_LOADING_REQUEST
});

// 사가
// user API
const userAPI = () => {
  const res = axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data);
  
  return res;
}

function* userSaga() {
  try {
    const res = yield call(userAPI);
    
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: res
    });
  } catch(err) {
    yield put({
      type: USER_LOADING_ERROR,
      payload: err
    });
  }
}

export function* usersSaga() {
  yield takeEvery(USER_LOADING_REQUEST, userSaga);
}

// 리듀서
const initialState = {
  users: [],
  loading: false,
  err: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case USER_LOADING_ERROR:
      return {
        ...state,
        err: action.payload,
        loading: false
      }
  
    default:
      return state;
  }
}