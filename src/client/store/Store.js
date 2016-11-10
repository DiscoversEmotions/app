import {
  fromJS
} from 'immutable';
import {
  Store as CoreStore
} from '~/core';
import * as actions from './actions';
import { bootMessages } from './messages';

export const Steps = {
  Boot: `boot`,
  MissingFiles: `missing-files`,
  RecoveryWillStart: `recovery-will-start`,
  RecoveryLvl1: `recovery-lvl-1`,
  RecoveryLvl2: `recovery-lvl-2`
};

export const Worlds = {
  Room: `room`,
  Mind: `mind`,
  Memory: `memory`
};

export const state = fromJS({
  size: {
    width: 600,
    height: 600
  },
  times: {},
  step: null,
  currentTime: null,
  glitch: false
});

export const computedState = fromJS({
  world: null,
  messages: [],
  systemFull: false
});

const stepsWithSystemFull = [
  Steps.MissingFiles,
  Steps.RecoveryWillStart
];

const stepsWithGlitch = [
  Steps.RecoveryLvl1
];

export class Store extends CoreStore {
  constructor() {
    super(state, computedState);

    // Use this file to avoit allocation
    this.tmp = {};

    // debug
    window.__store = this;
  }

  updateComputedState() {
    // Update step & world
    this.tmp.step = this.state.get(`step`);
    if (this.hasChanged(`step`)) {
      // Update world
      this.tmp.world = (() => {
        switch (this.tmp.step) {
        case Steps.RecoveryLvl1:
          return Worlds.Mind;
        default:
          return Worlds.Room;
        }
      })();
      this.computedState = this.computedState.set(`world`, this.tmp.world);
    }
    // Update system messages
    if (this.hasChanged(`currentTime`)) {
      this.tmp.timeSinceBoot = this.get(`currentTime`) - this.getIn([`time`, Steps.Boot]);
      this.tmp.messages = _(bootMessages)
      .filter(message => message.time <= this.tmp.timeSinceBoot)
      .orderBy(`time`)
      .slice(-5)
      .value();
      this.computedState = this.computedState.update(`messages`, (msgs) => msgs.merge(this.tmp.messages));
    }
    // Update system full
    if (this.hasChanged(`step`)) {
      this.tmp.systemFull = stepsWithSystemFull.indexOf(this.tmp.step) > -1;
      this.computedState = this.computedState.set(`systemFull`, this.tmp.systemFull);
    }
    // Glitch
    if (this.hasChanged(`step`) || this.hasChanged(`currentTime`)) {
      this.tmp.stepTime = this.getIn([`time`, this.tmp.step]);
      this.tmp.timeSinceStepStart = this.get(`currentTime`) - this.tmp.stepTime;
      this.tmp.glitch = stepsWithGlitch.indexOf(this.tmp.step) > -1 && this.tmp.timeSinceStepStart < 500;
      this.computedState = this.computedState.set(`glitch`, this.tmp.glitch);
    }
  }

  timeUpdate(time, dt) {
    this.tmp.step = this.get(`step`);
    this.tmp.stepTime = this.getIn([`time`, this.tmp.step]);
    this.tmp.currentTime = this.get(`currentTime`);
    // Init time if not set !
    if (this.tmp.stepTime === undefined) {
      this.dispatch(actions.time.set(this.tmp.step, time));
    }
    // Update time
    if (this.tmp.currentTime === undefined) {
      this.dispatch(actions.time.setCurrent(time));
    }
    // Update state every 200ms
    if (time - this.tmp.currentTime > 200) {
      this.dispatch(actions.time.setCurrent(time));
    }
    // Boot
    if (this.tmp.step === Steps.Boot) {
      this.tmp.timeSinceBoot = this.get(`currentTime`) - this.getIn([`time`, Steps.Boot]);
      if (this.tmp.timeSinceBoot > 7000) {
        this.dispatch(actions.step.setCurrent(Steps.MissingFiles));
      }
    }
  }
}
