import Signal from 'min-signal';
import raf from 'raf';
import now from 'right-now';

/**
 * MainLoop class
 */
export class MainLoop extends Signal {

  /**
   * constructor method
   */
  constructor(fn) {
    super();

    this.running = false;
    this.last = now();
    this._frame = 0;
    this._tick = this.tick.bind(this);

    if (fn) {
      this.add(fn);
    }
  }

  start () {
    if (this.running) {
      return;
    }
    this.running = true;
    this.last = now();
    this._frame = raf(this._tick);
    // this._frame = setTimeout(this._tick, 2000);
    return this;
  }

  stop () {
    this.running = false;
    if (this._frame !== 0) {
      raf.cancel(this._frame);
    }
    this._frame = 0;
    return this;
  }

  tick () {
    this._frame = raf(this._tick);
    // this._frame = setTimeout(this._tick, 2000);
    var time = now();
    var dt = (time - this.last) / 1000;
    this.dispatch(dt);
    this.last = time;
  }

}
