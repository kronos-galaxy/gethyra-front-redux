import { combineReducers } from 'redux';

import * as token from './token';
import * as user from './user';
import * as fetches from './fetches';

const redusers = combineReducers({
  ...token,
  ...user,
  ...fetches,
  // ...
});

export default redusers;
