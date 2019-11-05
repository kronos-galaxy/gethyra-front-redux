import { noop } from 'lodash/';
import { createActions } from 'redux-actions';

const {
  setToken,
  deleteToken,
  // ...
} = createActions({
  SET_TOKEN: token => token,
  DELETE_TOKEN: noop,
  // ...
});

export {
  setToken,
  deleteToken,
  // ...
};

export default {};
