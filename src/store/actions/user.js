import { createActions } from 'redux-actions';

const {
  setUser,
  deleteUser,
  // ...
} = createActions({
  SET_USER: user => user,
  DELETE_USER: user => user,
  // ...
});

export {
  setUser,
  deleteUser,
  // ...
};

export default {};
