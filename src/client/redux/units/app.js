import { Map } from 'immutable';

export const initialState = Map({
  loader: true
});

export const actionsTypes = {
  SET_LOADER_STATUS: 'app/SET_LOADER_STATUS'
};

export const actions = {
  setLoaderStatus(status) {
    return {
      type: actionsTypes.SET_LOADER_STATUS,
      payload: status
    };
  }
};

export function reducer (state = initialState, action) {
  switch (action.type) {
  case actionsTypes.SET_LOADER_STATUS:
    return state.set('loader', action.payload);
  default:
    return state;
  }
};
