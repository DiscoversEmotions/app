import { PerspectiveCamera, Object3D } from 'three';

/**
 * Camera class
 */
export class Camera extends Object3D{

  constructor(fov, aspect, near, far) {
    super();
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.add(this.camera);
  }

  update(time, dt) {

  }

  setVerticalAngle(x) {
    this.camera.rotation.x = x;
  }

  setHorizontalAngle(y) {
    this.rotation.y = y;
  }

  setSize (width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
