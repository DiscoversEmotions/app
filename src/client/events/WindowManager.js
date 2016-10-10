import Signal from 'min-signal';
import { on } from 'dom-events';
import debounce from 'lodash/debounce';

/**
 * Window class
 */
class WindowManager extends Signal {

  /**
   * constructor method
   */
  constructor() {
    super();

    on(window, 'resize', debounce(this.handleResize.bind(this), 100));
  }

  /**
   * handleResize method
   */
  handleResize() {
    this.dispatch(window.innerWidth, window.innerHeight);
  }
}

export default new WindowManager();
