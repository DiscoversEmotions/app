import { WebGLRenderer } from 'three';
import { WindowResizeSingleton } from './WindowResizeSingleton';

/**
 * Renderer class
 */
export class Renderer extends WebGLRenderer {

  /**
   * constructor method
   * @param {object} options Options
   */
  constructor(options = { antialias: true, alpha: true }) {
    console.log(options);
    console.log();
    super(options);

    this.setSize(window.innerWidth, window.innerHeight);
    this.setPixelRatio(window.devicePixelRatio);
    this.setClearColor(0x0a0a0a, 1.0);

    WindowResizeSingleton.getInstance().add(this.resize.bind(this));
  }

  /**
   * resize method
   * @param {number} width  Width
   * @param {number} height Height
   */
  resize(width, height) {
    this.setSize(width, height);
  }
}
