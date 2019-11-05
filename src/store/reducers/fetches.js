import { handleActions } from 'redux-actions';
import { Map, Set } from 'immutable';

const initialState = Map({
  byId: Map({}),
  allIds: Set([]),
});

export const fetches = handleActions(
  {
    SET_FETCH: (state, { payload: { id, body } }) => state.withMutations((newState) => {
      newState.setIn(['byId', id], body).updateIn(['allIds'], set => set.add(id));
    }),
    UPDATE_FETCH: (state, { payload: { id, body } }) => state.withMutations((newState) => {
      newState.setIn(['byId', id], body);
    }),
    DELETE_FETCH: (state, { payload: { id } }) => state.withMutations((newState) => {
      newState.deleteIn(['byId', id]).updateIn(['allIds'], set => set.delete(id));
    }),
  },
  initialState,
);

export default {};
