import { PerspectiveCamera } from 'three';
import { OrbitControls } from './OrbitControls';

/**
 * Camera class
 */
export class Camera extends PerspectiveCamera {

  /**
   * constructor method
   */
  constructor(element, fov, aspect, near, far, orbit = true) {
    super(fov, aspect, near, far);

    if (orbit) {
      this.controls = new OrbitControls(this, element);
      this.controls.enabled = true;
    }
  }

  /**
   * update method
   * @param {number} delta Delta
   */
  update(time, dt) {
    // this.controls.update(dt);
  }

  /**
   *
   */
  setSize (width, height) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}
