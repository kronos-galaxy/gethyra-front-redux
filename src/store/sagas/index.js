import { all } from 'redux-saga/effects';
import { reduce, map, values } from 'lodash/';

import * as auth from './auth';

const getListeners = (...args) => reduce(
  args,
  (acc, next) => [...acc, map(values(next), func => func())],
  [],
);

export default function* rootSaga() {
  yield all(getListeners(
    auth,
    // ...
  ));
}
