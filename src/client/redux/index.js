import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerForBrowser } from 'redux-little-router';
import { reducer as system } from './system';

const initialState = {};
const rootReducer = combineReducers({
  system
});

export function createStore (routes) {
  const {
    routerEnhancer,
    routerMiddleware
  } = routerForBrowser({
    routes
  });
  return reduxCreateStore(
    rootReducer,
    compose(
      routerEnhancer,
      applyMiddleware(routerMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}
