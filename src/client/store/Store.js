import {
  fromJS,
  Map
} from 'immutable';
import * as selectors from './selectors';
import * as actions from './actions';
import { initialState } from './state';
import { getComputedStateUpdaters } from './computed';
import { Worlds, Steps } from '~/types';
import _ from 'lodash';

/**
 * STORE
 */

export class Store {
  constructor() {
    this.state = initialState;

    this.selectors = this._wrapSelectors(selectors);
    this.actions = this._wrapAction(actions);
    console.log(this.actions);

    this.computedStateUpdaters = getComputedStateUpdaters(this.selectors);

    this._computedStateKeys = Object.keys(this.computedStateUpdaters);

    this.computedState = this._getNextComputedState(Map(), this.state, Map());
    // bind
    this.dispatch = this.dispatch.bind(this);

    // debug
    window.__store = this;
  }

  // timeUpdate(time, dt) {
  //   const step = this.get(`step`);
  //   const stepTime = this.getIn([`time`, step]);
  //   const currentTime = this.get(`currentTime`);
  //   // Init time if not set !
  //   if (stepTime === undefined) {
  //     this.dispatch(actions.time.set(step, time));
  //   }
  //   // Update time
  //   if (currentTime === undefined) {
  //     this.dispatch(actions.time.setCurrent(time));
  //   }
  //   // Update state every 200ms
  //   if (time - currentTime > 200) {
  //     this.dispatch(actions.time.setCurrent(time));
  //   }
  //   // Boot
  //   if (step === Steps.Boot) {
  //     const timeSinceBoot = this.get(`currentTime`) - this.getIn([`time`, Steps.Boot]);
  //     if (timeSinceBoot > 7000) {
  //       this.dispatch(actions.step.setCurrent(Steps.MissingFiles));
  //     }
  //   }
  // }

  dispatch(updater) {
    const nextState = updater(this.state);
    if (nextState !== this.state) {
      const prevState = this.state;
      this.state = nextState;
      const nextComputedState = this._getNextComputedState(this.computedState, nextState, prevState);
      if (nextComputedState !== this.computedState ) {
        this.computedState = nextComputedState;
      }
    }
  }

  _getNextComputedState(lastComputedState, newState, prevState) {
    return lastComputedState
      .withMutations((temporaryState) => {
        this._computedStateKeys.forEach((keyName) => {
          const compute = this.computedStateUpdaters[keyName];
          temporaryState.update(keyName, (value) => {
            return compute(value, newState, prevState);
          });
        });
      });
  }

  _wrapAction(actions) {
    return _.mapValues(actions, (action) => {
      if (_.isFunction(action)) {
        return (...args) => this.dispatch(action(...args));
      }
      return this._wrapAction(action);
    });
  }

  _wrapSelectors(selectors) {
    return _.mapValues(selectors, (selector) => {
      if (_.isFunction(selector)) {
        return (props) => selector(this.state, props);
      }
      return this._wrapSelectors(selector);
    });
  }

}
