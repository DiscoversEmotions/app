export default class BootStep {

  constructor() {
    this.startTime = null;
  }

  start(time, dt, state, updateState) {
    console.log(`start boot`);
    this.startTime = time;
  }

  update(time, dt, state, updateState) {
    if (time - this.startTime > 3) {
      return `boot2`;
    }
    return null;
  }

  stop(time, dt, state, updateState) {
    console.log(`stop boot`);
    this.startTime = null;
  }

}
