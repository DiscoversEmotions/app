import { Mesh, PlaneGeometry, MeshBasicMaterial } from 'three';

/**
 * Cube class
 */
export class Ground extends Mesh {

  /**
   * constructor method
   */
  constructor() {
    super(new PlaneGeometry(1000, 1000, 10, 10), new MeshBasicMaterial());
  }

  /**
   * update method
   * @param {number} time Time
   */
  update(time, dt) {

  }
}
