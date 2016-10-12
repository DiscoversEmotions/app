import { createStore, combineReducers } from 'redux';
import units from './units';
import _ from 'lodash';

const rootReducer = combineReducers(
  _.mapValues(units, unit => unit.reducer)
);

export const store = createStore(rootReducer);

export const actions = _.mapValues(units, unit => unit.actions);
