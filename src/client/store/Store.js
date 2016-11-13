import {
  fromJS,
  Map
} from 'immutable';
import * as selectors from './selectors';
import { Worlds, Steps } from './types';

export const initialState = fromJS({
  size: {
    width: 600,
    height: 600
  },
  stepsTimes: {},
  time: 0
});

export const computedStateUpdaters = {
  world: (value = Worlds.Room, state, prevState) => {
    return selectors.worldSelector(state);
  },
  step: (value = Steps.PreBoot, state, prevState) => {
    return selectors.stepSelector(state);
  },
  glitch: (value = false, state) => {
    return value;
  }
  // webgl: (state, lastState = initialWebglState) => {
    // // Update step & world
    // const step = state.get(`step`);

    // // Update system messages
    // if (this.hasChanged(`currentTime`)) {
    //   const timeSinceBoot = this.get(`currentTime`) - this.getIn([`time`, Steps.Boot]);
    //   const messages = _(bootMessages)
    //   .filter(message => message.time <= timeSinceBoot)
    //   .orderBy(`time`)
    //   .slice(-5)
    //   .value();
    //   this.computedState = this.computedState.update(`messages`, (msgs) => msgs.merge(messages));
    // }
    // // Update system full
    // if (this.hasChanged(`step`)) {
    //   const systemFull = stepsWithSystemFull.indexOf(step) > -1;
    //   this.computedState = this.computedState.set(`systemFull`, systemFull);
    // }
    // // Glitch
    // if (this.hasChanged(`step`) || this.hasChanged(`currentTime`)) {
    //   const stepTime = this.getIn([`time`, step]);
    //   const timeSinceStepStart = this.get(`currentTime`) - stepTime;
    //   const glitch = stepsWithGlitch.indexOf(step) > -1 && timeSinceStepStart < 500;
    //   this.computedState = this.computedState.set(`glitch`, glitch);
    // }

    // return lastState;
  // }
};

/**
 * STORE
 */

export class Store {
  constructor() {
    this.state = initialState;
    this.computedStateUpdaters = computedStateUpdaters;
    this.computedStateKeys = Object.keys(this.computedStateUpdaters);

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
        this.computedStateKeys.forEach((keyName) => {
          const compute = this.computedStateUpdaters[keyName];
          temporaryState.update(keyName, (value) => {
            return compute(value, newState, prevState);
          });
        });
      });
  }

}
