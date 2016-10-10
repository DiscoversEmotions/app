import { Mesh } from 'three';
import { GUISingleton } from '~/core';
import CubeGeometry from './CubeGeometry';
import CubeMaterial from './CubeMaterial';

/**
 * Cube class
 */
export class Cube extends Mesh {

  /**
   * constructor method
   */
  constructor() {
    super(new CubeGeometry(), new CubeMaterial({ wireframe: true }));
  }

  /**
   * update method
   * @param {number} time Time
   */
  update(time, dt) {
    this.material.update(time);
  }
}
