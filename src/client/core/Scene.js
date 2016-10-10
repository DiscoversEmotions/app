import { Scene as ThreeScene } from 'three';
import { Clock } from './Clock';

/**
 * Scene class
 */
export class Scene extends ThreeScene {

  /**
   *
   */
  constructor() {
    super();
    this.createScene();
  }

  /**
   * createScene method
   */
  createScene() {}

  /**
   * render method
   */
  update(time, dt) {
  };
}
