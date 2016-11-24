import { Cameraman } from '~/webgl';
import { Object3D } from 'three';

export class BlackWorld {

  constructor(app, controller, parentElement) {
    this.app = app;
    this.controller = controller;
    this.parentElement = parentElement;

    this.scene = new Object3D();

    this.cameraman = new Cameraman(45, 1, 1, 1100);
  }

  getCameraman() {
    return this.cameraman;
  }

  getScene() {
    return this.scene;
  }

  update(time, dt) {

  }

  mount() {
  }

  unmount() {
  }

  setSize(width, height) {
    this.cameraman.setSize(width, height);
  }

}
