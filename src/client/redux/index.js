import { createStore, combineReducers } from 'redux';
import units from './units';
import _ from 'lodash';

const rootReducer = combineReducers(
  _.mapValues(units, unit => unit.reducer)
);

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(rootReducer, enhancer);

export const actions = _.mapValues(units, unit => unit.actions);
