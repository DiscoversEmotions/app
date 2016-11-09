import { world, switchColor, setStep } from '~/actions';

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
      this.secondCount = seconds;
      // console.log(`time update ${seconds}`);
      // if (seconds === 6) {
      //   stateManager.updateState(world.setWorld(`mind`));
      // }
      // if (seconds === 10) {
      //   stateManager.updateState(world.setWorld(`memory`));
      // }
      // if (seconds === 13) {
      //   stateManager.updateState(world.setWorld(`mind`));
      // }
      // if (seconds === 16) {
      //   stateManager.updateState(world.setWorld(`room`));
      // }
    }
    this.time = time;
    if (time - this.startTime > 5000) {
      stateManager.updateState(setStep(`boot2`));
    }
  }

  stop(stateManager, time, dt) {
    console.log(`stop boot`);
    this.startTime = null;
  }

}
