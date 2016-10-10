import { Composer } from '@superguigui/wagner';
import { WindowResizeSingleton } from '../events/WindowResizeSingleton';

/**
 * EffectComposer class
 */
class EffectComposer extends Composer {

  /**
   * constructor method
   * @param {object} renderer Renderer
   * @param {object} options  Options
   */
  constructor(renderer, options) {
    super(renderer, options);

    this.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);

    WindowResizeSingleton.getInstance().add(this.resize.bind(this));
  }

  /**
   * resize method
   * @param {number} width  Width
   * @param {number} height Height
   */
  resize(width, height) {
    this.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
  }
}

export default EffectComposer;
