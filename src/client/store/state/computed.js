import { Worlds, Steps } from '~/types';
import * as selectors from '../selectors';

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
