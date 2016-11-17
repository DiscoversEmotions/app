import {
  fromJS,
  Map
} from 'immutable';
import * as selectors from './selectors';
import * as actions from './actions';
import { initialState, computedStateUpdaters } from './state';
import { Worlds, Steps } from '~/types';

/**
 * STORE
 */

export class Store {
  constructor() {
    this.state = initialState;
    this.computedStateUpdaters = computedStateUpdaters;
    this.selectors = selectors;
    this.actions = actions;

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

}
