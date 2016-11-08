import Signal from 'min-signal';
import { on } from 'dom-events';
import debounce from 'lodash/debounce';

let windowResizeSingletonInstance = null;

/**
 * Window class
 */
export class WindowResizeSingleton extends Signal {

  /**
   *
   */
  static getInstance() {
    if (windowResizeSingletonInstance === null) {
      windowResizeSingletonInstance = new WindowResizeSingleton();
    }
    return windowResizeSingletonInstance;
  }

  /**
   * constructor method
   */
  constructor() {
    super();
    this.width = null;
    this.height = null;

    on(window, `resize`, debounce(this.handleResize.bind(this), 100));
    this.handleResize();
  }

  add(cb, ...args) {
    var result = super.add(cb, ...args);
    cb(this.width, this.height);
    return result;
  }

  /**
   * handleResize method
   */
  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dispatch(this.width, this.height);
  }
}
