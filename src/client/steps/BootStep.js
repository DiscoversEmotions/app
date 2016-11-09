import { world, step } from '~/store/actions';

export default class BootStep {

  constructor() {
    this.startTime = null;
  }

  start(stateManager, time, dt) {
    console.log(`start boot`);
    this.startTime = time;
    this.seconds = 0;
    stateManager.dispatch(step.setData(
      `boot`,
      {
        seconds: 0
      }
    ));
  }

  update(stateManager, time, dt) {
    const seconds = Math.round((time - this.startTime) / 100) / 10;
    if (seconds !== this.seconds) {
      this.seconds = seconds;
      stateManager.dispatch(step.updateData(`boot`, data => data.set(`seconds`, this.seconds)));
      if (seconds >= 8) {
        stateManager.dispatch(step.setCurrent(`needRecovery`));
      }
    }
  }

  stop(stateManager, time, dt) {
    console.log(`stop boot`);
    this.startTime = null;
  }

}
