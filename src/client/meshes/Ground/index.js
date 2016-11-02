import { Mesh, PlaneGeometry, MeshPhongMaterial, DoubleSide, ObjectLoader } from 'three';

/**
 * Cube class
 */
export class Ground extends Mesh {

  /**
   * constructor method
   */
  constructor() {
    super(new PlaneGeometry(10, 10, 10, 10), new MeshPhongMaterial({color: 0xffff00, side: DoubleSide}));
    this.rotation.x = - Math.PI / 2;
  }

  /**
   * update method
   * @param {number} time Time
   */
  update(time, dt) {

  }
}
