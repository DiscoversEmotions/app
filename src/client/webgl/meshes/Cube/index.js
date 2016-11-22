import { Mesh } from '~/three';
import { GUISingleton } from '~/core/utils';
import CubeBufferGeometry from './CubeBufferGeometry';
import CubeMaterial from './CubeMaterial';

/**
 * Cube class
 */
export class Cube extends Mesh {

  /**
   * constructor method
   */
  constructor() {
    var geom = new CubeBufferGeometry();
    super(geom, new CubeMaterial(geom));
  }

  /**
   * update method
   * @param {number} time Time
   */
  update(time, dt) {
    this.material.update(time, dt);
  }
}
