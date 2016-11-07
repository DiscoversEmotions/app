import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

// ACTIONS TYPES
const SWITCH_COLOR = `SYSTEM/SWITCH_COLOR`;

const initialState = Map({
  color: `red`
});

export const switchColor = createAction(SWITCH_COLOR);

export const reducer = handleActions({
  [SWITCH_COLOR]: (state, action) => {
    if (state.get(`color`) === `red`) {
      return state.set(`color`, `blue`);
    }
    return state.set(`color`, `red`);
  }
}, initialState);
