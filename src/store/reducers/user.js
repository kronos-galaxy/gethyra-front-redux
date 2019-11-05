import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

const initialState = Map({
  name: '',
  email: '',
  isEmailConfirmed: false,
  isUserDeleted: false,
});

export const user = handleActions(
  {
    SET_USER: (state, action) => state.merge(action.payload),
    DELETE_USER: (state, action) => state.set(initialState),
  },
  initialState,
);

export default {};
