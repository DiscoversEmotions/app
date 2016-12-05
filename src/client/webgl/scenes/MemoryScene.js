import {
  PointLight, Object3D, AudioListener, Audio, AudioAnalyser, MeshPhongMaterial, Mesh, BoxGeometry
} from 'three';
import { Scene } from './Scene';
import { Steps } from '~/types';

export class MemoryScene extends Scene {

  constructor(...args) {
    super(...args);

    this.cameraman.position.set(0, 0, 5);
    this.scene.add(this.cameraman);

    this.material_cube1 = new MeshPhongMaterial( { color: 0xffaa00, shininess: 0 } );
    this.cube1_geom = new BoxGeometry(1, 1, 1);
    this.cube1 = new Mesh(this.cube1_geom, this.material_cube1);
    this.scene.add(this.cube1);

    this.light = new PointLight();
    this.light.position.y = 5;
    this.scene.add(this.light);

    this.audioListener = new AudioListener();
    this.memorySound = new Audio(this.audioListener);
    console.log(this.memorySound);
    this.scene.add(this.memorySound);

    this.analyser1 = new AudioAnalyser(this.memorySound, 32);

    this.isPlaySound = false;
  }

  mount() {
    this.solved = false;

    if (this.isPlaySound == false){
      this.memorySound.setBuffer(this.app.assetsManager.getAsset(`memory_love`));
      // Override onended
      const initialOnEnded = this.memorySound.source.onended;
      this.memorySound.source.onended = () => {
        initialOnEnded();
        if (this.solved === false) {
          this.controller.getSignal(`app.setNextStep`)();
          this.solved = true;
        }
      };
      this.memorySound.play();
    }
  }

  getEnvConfig() {
    return {
      background: 0x000000
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

}
