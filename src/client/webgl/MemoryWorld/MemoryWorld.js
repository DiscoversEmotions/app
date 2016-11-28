import { Cube } from '~/webgl/meshes';
import { Cameraman } from '~/webgl';
import { PointLight, Object3D, Color, AudioListener, Audio, AudioAnalyser, MeshPhongMaterial } from 'three';

export class MemoryWorld {

  constructor(app, controller, parentElement) {
    this.app = app;
    this.controller = controller;
    this.parentElement = parentElement;

    this.scene = new Object3D();
    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 2, 5);
    this.scene.add(this.cameraman);

    this.cube1 = new Cube(this.material_cube1);
    this.scene.add(this.cube1);

    this.material_cube1 = new MeshPhongMaterial( { color: 0xffaa00, shininess: 0 } );

    this.light = new PointLight();
    this.light.position.y = 5;
    this.scene.add(this.light);

    this.audioListener = new AudioListener();
    this.memorySound = new Audio(this.audioListener);
    this.scene.add(this.memorySound);

    this.analyser1 = new AudioAnalyser(this.memorySound, 32);

  }

  mount() {
    this.memorySound.setBuffer(this.app.assetsManager.getAsset(`memory1`));
    this.memorySound.play();
  }

  getCameraman() {
    return this.cameraman;
  }

  getScene() {
    return this.scene;
  }

  getEnvConfig() {
    return {
      background: new Color(1, 1, 1)
    };
  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;

    this.material_cube1.emissive = this.analyser1.getAverageFrequency() / 256;

    console.log(this.analyser1.getAverageFrequency() / 256);
  }

  setSize(width, height) {
    this.cameraman.setSize(width, height);
  }

}
