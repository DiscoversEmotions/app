import { Composer } from '@alex_toudic/wagner';

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
