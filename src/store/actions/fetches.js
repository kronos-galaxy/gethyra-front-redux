import { createActions } from 'redux-actions';

const {
  setFetch,
  updateFetch,
  deleteFetch,
  // ...
} = createActions({
  SET_FETCH: fetch => fetch,
  UPDATE_FETCH: fetch => fetch,
  DELETE_FETCH: id => id,
  // ...
});

export {
  setFetch,
  updateFetch,
  deleteFetch,
  // ...
};

export default {};
