import { switchColor } from '~/actions';

export default class BootStepBis {

  constructor() {
    this.startTime = null;
  }

  start(stateManager, time, dt) {
    console.log(`start boot2`);
    if (time) {
      this.startTime = time;
      stateManager.updateState(switchColor());
    }
  }

  update(stateManager, time, dt) {
    return null;
  }

  stop(stateManager, time, dt) {
    console.log(`stop boot2`);
    this.startTime = null;
  }

}
