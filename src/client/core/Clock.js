import now from 'right-now';

/**
 * Clock class
 */
export class Clock {

  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.running = false;
  }

  start() {
    this.startTime = now();
    this.running = true;
  }

  reset() {
    this.elapsedTime = 0;
    this.start();
  }

  getElapsedTime() {
    this._updateElapseTime();
    return this.elapsedTime;
  }

  getDelta(key) {
    var diff = 0;
    if (!this.running) {
      throw new Error(`Clock is not running !`);
      return;
    }
    var newTime = now();
    diff = (newTime - this.oldTime) / 1000;
    this.oldTime = newTime;
    this._updateElapseTime();
    return diff;
  }

  _updateElapseTime() {
    this.elapsedTime = (now() - this.startTime) / 1000;
  }

}
