import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

const initialState = Map({ key: '' });

export const token = handleActions(
  {
    SET_TOKEN: (state, action) => state.set('key', action.payload),
    DELETE_TOKEN: state => state.set('key', ''),
  },
  initialState,
);

export default {};
