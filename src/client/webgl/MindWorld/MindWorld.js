import { Cube } from '~/webgl/meshes';
import { Cameraman } from '~/webgl';
import { PointLight, Object3D } from 'three';

export class MindWorld {

  constructor(stateManager, parentElement) {
    this.stateManager = stateManager;
    this.parentElement = parentElement;

    this.scene = new Object3D();

    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 1, 5);

    this.cube1 = new Cube();
    this.scene.add(this.cube1);

    this.light = new PointLight();
    this.light.position.y = 5;
    this.scene.add(this.light);

    this.rootObject = new Object3D();
    this.rootObject.add(this.scene);
    this.rootObject.add(this.cameraman);
  }

  getCameraman() {
    return this.cameraman;
  }

  getRootObject() {
    return this.rootObject;
  }

  getScene() {
    return this.scene;
  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;
  }

  setSize(width, height) {
    this.cameraman.setSize(width, height);
  }

}
