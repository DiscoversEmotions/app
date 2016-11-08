export default class BootStep {

  constructor() {
    this.startTime = null;
    this.time = null;
  }

  start(stateManager, time, dt) {
    console.log(`start boot`);
    this.startTime = time;
    this.secondCount = 0;
  }

  update(stateManager, time, dt) {
    const seconds = Math.round((time - this.startTime) / 1000);
    if (seconds !== this.secondCount) {
      console.log(`time update ${seconds}`);
      this.secondCount = seconds;
    }
    this.time = time;
    if (time - this.startTime > 5000) {
      return `boot2`;
    }
    return null;
  }

  stop(stateManager, time, dt) {
    console.log(`stop boot`);
    this.startTime = null;
  }

}
