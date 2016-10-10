import now from 'right-now';

/**
 * Clock class
 */
export class Clock {

  constructor(autoStart) {
    this.autoStart = (autoStart !== undefined) ? autoStart : true;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.keys = {};
    this.running = false;
  }

  start() {
    this.startTime = now();
    this.running = true;
  }

  reset() {
    this.keys = {};
    this.start();
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  lap(key) {

  }

  getDelta(key) {
    if (this.keys[key] === undefined) {
      this.keys[key] = {};
    }
    var diff = 0;
    if (this.autoStart && !this.running) {
      this.start();
    }

    if (this.running) {
      var newTime = now();
      diff = (newTime - this.oldTime) / 1000;
      this.oldTime = newTime;
      this.elapsedTime += diff;
    }

    return diff;
  }

}
