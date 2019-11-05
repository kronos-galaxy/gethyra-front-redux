import {
  put,
  // takeEvery,
  call,
  takeLatest,
} from 'redux-saga/effects';

import { delay } from 'redux-saga';

import {
  signIn,
  signOut,
  signUp,
  setToken,
  setUser,
  deleteUser,
  deleteToken,
  setFetch,
  updateFetch,
  deleteFetch,
} from 'store/actions';

import GetApi from 'api';

function* signInSaga({ payload: { id, body } }) {
  yield put(setFetch({ id, body: { loading: true, error: '' } }));
  const res = yield call(GetApi().signIn, { body });
  if (res.error) {
    yield put(updateFetch({ id, body: { loading: false, error: res.error.message } }));
  } else {
    yield put(setUser(res.user));
    yield put(setToken(res.token));
    yield put(deleteFetch({ id }));
  }
}

function* signUpSaga({ payload: { id, body } }) {
  yield put(setFetch({ id, body: { loading: true, error: '' } }));
  const res = yield call(GetApi().signUp, { body });
  yield delay(5000);
  if (res.error) {
    yield put(updateFetch({ id, body: { loading: false, error: res.error.message } }));
  } else {
    // Обработка удачной отправки данных
    console.log('sign up complete');
    yield put(deleteFetch({ id }));
  }
}

function* signOutSaga() {
  yield put(deleteUser());
  yield put(deleteToken());
}

export function* watchAuthAsync() {
  yield takeLatest(signIn, signInSaga);
  yield takeLatest(signUp, signUpSaga);
  yield takeLatest(signOut, signOutSaga);
}

export default {};
