import { Cube } from '~/webgl/meshes';
import { Cameraman } from '~/webgl';
import { PointLight, Object3D, Color, AudioListener, Audio, AudioAnalyser, MeshPhongMaterial, Mesh, BoxGeometry } from 'three';

export class MemoryWorld {

  constructor(app, controller, parentElement) {
    this.app = app;
    this.controller = controller;
    this.parentElement = parentElement;

    this.scene = new Object3D();
    this.scene.name = `MemoryWorld-scene`;
    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 0, 5);
    this.scene.add(this.cameraman);

    // this.cube1 = new Cube(this.material_cube1);
    this.material_cube1 = new MeshPhongMaterial( { color: 0xffaa00, shininess: 0 } );
    this.cube1_geom = new BoxGeometry(1, 1, 1);
    this.cube1 = new Mesh(this.cube1_geom, this.material_cube1);
    this.scene.add(this.cube1);

    this.light = new PointLight();
    this.light.position.y = 5;
    // this.scene.add(this.light);

    this.audioListener = new AudioListener();
    this.memorySound = new Audio(this.audioListener);
    this.scene.add(this.memorySound);

    this.analyser1 = new AudioAnalyser(this.memorySound, 32);

    this.isPlaySound = false;

  }

  mount() {

    if (this.isPlaySound == false){

      this.memorySound.setBuffer(this.app.assetsManager.getAsset(`memory1`));
      this.memorySound.play();

    }
  }

  getCameraman() {
    return this.cameraman;
  }

  getScene() {
    return this.scene;
  }

  getEnvConfig() {
    return {
      background: new Color(0x000000)
    };
  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;

    const audioLvl = this.analyser1.getAverageFrequency() / 256;

    this.material_cube1.emissive.b = audioLvl;
    const scale = 1 + audioLvl;
    this.cube1.scale.set(scale, scale, scale);
  }

  setSize(width, height) {
    this.cameraman.setSize(width, height);
  }

}
