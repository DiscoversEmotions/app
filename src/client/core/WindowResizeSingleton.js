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

    on(window, `resize`, debounce(this.handleResize.bind(this), 100));
  }

  /**
   * handleResize method
   */
  handleResize() {
    this.dispatch(window.innerWidth, window.innerHeight);
  }
}
