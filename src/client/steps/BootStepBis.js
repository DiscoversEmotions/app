import { switchColor } from '~/actions';

export default class BootStepBis {

  constructor() {
    this.startTime = null;
  }

  start(state, updateState, time, dt) {
    console.log(`start boot2`);
    if (time) {
      this.startTime = time;
      updateState(switchColor());
    }
  }

  update(state, updateState, time, dt) {
    return null;
  }

  stop(state, updateState, time, dt) {
    console.log(`stop boot2`);
    this.startTime = null;
  }

}
