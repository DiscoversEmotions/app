import { PerspectiveCamera, Object3D } from 'three';

/**
 * Cameraman class
 */
export class Cameraman extends Object3D {

  constructor(fov, aspect, near, far) {
    super();
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.add(this.camera);
  }

  update(time, dt) {

  }

  getCamera() {
    return this.camera;
  }

  setVerticalAngle(x) {
    this.camera.rotation.x = x;
  }

  setHorizontalAngle(y) {
    this.rotation.y = y;
  }

  getVerticalAngle() {
    return this.camera.rotation.x;
  }

  getHorizontalAngle() {
    return this.rotation.y;
  }

  setSize (width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
