import { createStore } from 'redux';

const initialState = {
  tab: 0,
  config: null
}

function counter(state = initialState, action) {
  switch (action.type) {
  case 'SET_TAB':
    return {
      ...state,
      tab: action.payload
    }
  case 'SET_CONFIG':
    return {
      ...state,
      config: action.payload
    }
  default:
    return state
  }
}

const store = createStore(counter)

export default store;
