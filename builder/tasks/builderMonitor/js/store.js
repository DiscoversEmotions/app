import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const initialState = {
  tab: 0,
  config: null,
  clientStats: null,
  jsonViewer: {},
  clientStatus: 'unknow'
}

function reducer(state = initialState, action) {
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
  case 'SET_CLIENT_STATUS':
    return {
      ...state,
      clientStatus: action.payload
    }
  case 'JSON_VIEWER_INIT':
    return {
      ...state,
      jsonViewer: {
        ...state.jsonViewer,
        [action.key]: {}
      }
    }
  case 'JSON_VIEWER_TOGGLE_PATH':
    return {
      ...state,
      jsonViewer: {
        ...state.jsonViewer,
        [action.key]: {
          ...state.jsonViewer[action.key],
          [action.payload]: state.jsonViewer[action.key][action.payload] ? false : true
        }

      }
    }
  case 'SET_CLIENT_STATS':
    return {
      ...state,
      clientStats: action.payload
    }
  default:
    return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
