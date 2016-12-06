import {
  PointLight, Object3D, MeshPhongMaterial, Mesh, BoxGeometry
} from 'three';
import { Scene } from './Scene';
import { Steps } from '~/types';
import sono from 'sono';

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

  }

  mount() {
    this.solved = false;
    this.level = this.controller.getState(`app.level`);
    this.momoryBuffer = null;
    this.analyser = null;

    if (this.level === 1) {
      this.mountMemory1();
    } else if (this.level === 2) {
      this.mountMemory2();
    } else if (this.level === 3) {
      this.mountMemory3();
    }

    this.memorySound = sono.createSound(this.momoryBuffer);
    this.memorySound.on(`ended`, () => {
      this.controller.getSignal(`app.setNextStep`)();
      this.solved = true;
    });
    this.analyser = sono.effect.analyser({
        fftSize: 2048,
        smoothingTimeConstant: 0.7
    });
    console.log(this.analyser);
    this.memorySound.play();
  }

  mountMemory1() {
    this.momoryBuffer = this.app.assetsManager.getAsset(`memory_love`);
  }

  mountMemory2() {
    this.momoryBuffer = this.app.assetsManager.getAsset(`memory_anger`);
  }

  mountMemory3() {
    this.momoryBuffer = this.app.assetsManager.getAsset(`memory_sadness`);
  }


  getEnvConfig() {
    return {
      background: 0x000000
    };
  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;

    this.analyser.getAmplitude((amplitude) => {
      const amp = (amplitude - 0.9) * 10;

      this.material_cube1.emissive.b = amp;
      const scale = 1 + amp;
      this.cube1.scale.set(scale, scale, scale);
    });

  }

}
