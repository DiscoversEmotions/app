import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerForBrowser } from 'redux-little-router';

const initialState = {};
const rootReducer = combineReducers({
  yolo: (state = 0) => state
});

export function createStore (routes) {
  const {
    routerEnhancer,
    routerMiddleware
  } = routerForBrowser({
    routes,
    basename: `/`
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
