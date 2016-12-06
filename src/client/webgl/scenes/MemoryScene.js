import {
  PointLight, Object3D, MeshPhongMaterial, Mesh, BoxGeometry,SphereGeometry, MeshBasicMaterial, AmbientLight, DoubleSide, Line, LineBasicMaterial, Vector3, Geometry, Color
} from 'three';
import { Scene } from './Scene';
import { Steps } from '~/types';
import sono from 'sono';

export class MemoryScene extends Scene {

  constructor(...args) {
    super(...args);

    this.cameraman.position.set(0, 0, 5);
    this.scene.add(this.cameraman);

    this.material_cube1 = new MeshBasicMaterial( { color: 0xd5d5d5, wireframe: true, side: DoubleSide } );
    this.cube1_geom = new SphereGeometry(5, 10, 10);
    this.cube1 = new Mesh(this.cube1_geom, this.material_cube1);
    this.cube1.rotation.x = 1;
    this.scene.add(this.cube1);

    this.light = new AmbientLight( 0x404040, 3 );
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
        fftSize: 256,
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
      background: new Color(0xffffff)
    };
  }

  update(time, dt) {
    // this.cube1.rotation.x += 0.01;
    // this.cube1.rotation.y += 0.02;

    // const audioLvl = this.analyser1.getAverageFrequency() / 256;
    // const audioLvl = this.analyser1.getFrequencyData()[ 8 ] / 256;
    const scale = this.analyser.getFrequencies()[ 8 ] / 256;

    // console.log(audioLvl);

    // this.material_cube1.emissive.b = audioLvl;
    // this.cube1.scale.set(scale, scale, scale);

    this.cube1.scale.x = .3 + (scale / 20);
    this.cube1.scale.y = .3 + (scale / 20);
    this.cube1.scale.z = .3 + (scale / 20);

    for (let i = 0; i < this.cube1.geometry.vertices.length; i++) {

      // this.cube1.geometry.vertices[i].x = this.analyser1.getFrequencyData()[ i ] / 100;
      // this.cube1.geometry.vertices[i].y = this.analyser1.getFrequencyData()[ i ] / 300;
      // this.cube1.geometry.vertices[i].z = this.analyser1.getFrequencyData()[ i ] / 100;
    }

    this.cube1.geometry.verticesNeedUpdate = true;

  }

}
