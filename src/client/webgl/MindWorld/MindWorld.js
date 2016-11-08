import { Cube } from '~/webgl/meshes';
import { Camera } from '~/webgl';
import { PointLight, Object3D } from 'three';

export class MindWorld {

  constructor(stateManager) {
    this.stateManager = stateManager;

    this.scene = new Object3D();
    this.camera = new Camera(45, 1, 1, 1100);
    this.camera.position.set(0, 2, 5);
    this.scene.add(this.camera);

    this.cube1 = new Cube();
    this.scene.add(this.cube1);

    this.light = new PointLight();
    this.light.position.y = 5;
    this.scene.add(this.light);
  }

  getCamera() {
    return this.camera.camera;
  }

  getScene() {
    return this.scene;
  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;
  }

  setSize(width, height) {
    this.camera.setSize(width, height);
  }

}
