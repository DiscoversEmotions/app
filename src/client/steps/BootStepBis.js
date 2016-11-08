import { switchColor } from '~/actions';

export default class BootStepBis {

  constructor() {
    this.startTime = null;
  }

  start(time, dt, state, updateState) {
    console.log(`start boot2`);
    this.startTime = time;
    updateState(switchColor());
  }

  update(time, dt, state, updateState) {
    return null;
  }

  stop(time, dt, state, updateState) {
    console.log(`stop boot2`);
    this.startTime = null;
  }

}
