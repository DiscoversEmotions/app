import { Composer } from '@alex_toudic/wagner';
import { WindowResizeSingleton } from './WindowResizeSingleton';

/**
 * PostProcessing
 */
export class PostProcessing {

  /**
   * constructor method
   */
  constructor(renderer) {
    // TODO: make it an option
    this.active = true;
    this.renderer = renderer;
    this.effects = this.initEffects();
    this.composer = new Composer(renderer);

    WindowResizeSingleton.getInstance().add(this.resize.bind(this));
  }

  resize(width, height) {
    this.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
  }

  initEffects () {
    return [];
  }

  update (time, dt) {

  }

  render (scene, camera) {
    if(this.active) {
      this.composer.reset();
      this.composer.render(scene, camera);
      this.effects
        .filter(effect => effect.active)
        .forEach(effect => {
          this.composer.pass(effect.pass);
        });
      this.composer.toScreen();
    } else {
      this.renderer.render(scene, camera);
    }
  }
}
