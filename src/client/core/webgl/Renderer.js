import { WebGLRenderer } from 'three';
import { WindowResizeSingleton } from '~/core/utils';

/**
 * Renderer class
 */
export class Renderer extends WebGLRenderer {

  /**
   * constructor method
   * @param {object} options Options
   */
  constructor(options = { antialias: true, alpha: true }) {
    super(options);

    this.setPixelRatio(window.devicePixelRatio);
    this.setClearColor(0x0a0a0a, 1.0);
  }

  /**
   *
   */
  setSize(width, height) {
    super.setSize(width, height);
  }
}
