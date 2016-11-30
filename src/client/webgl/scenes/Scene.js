import { Object3D } from 'three';
import { Cameraman } from '~/webgl';

export class Scene {
  constructor(name, webglCore, app, controller, parentElement) {
    this.app = app;
    this.webglCore = webglCore;
    this.controller = controller;
    this.parentElement = parentElement;
    this.name = name;

    this.scene = new Object3D();
    this.scene.name = this.name;

    this.size = {
      width: 600,
      height: 600
    };

    this.cameraman = new Cameraman(45, 1, 1, 1100);
  }

  getScene() {
    return this.scene;
  }

  getCameraman() {
    return this.cameraman;
  }

  setSize(width, height) {
    this.size = { width, height };
    this.cameraman.setSize(width, height);
  }

}
