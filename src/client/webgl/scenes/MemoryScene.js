import {
  PointLight, Object3D, MeshPhongMaterial, Mesh, BoxGeometry,SphereGeometry, MeshBasicMaterial, AmbientLight, DoubleSide, Line, LineBasicMaterial, Vector3, Geometry, Color, PointsMaterial, Points, AdditiveBlending
} from 'three';
import { Scene } from './Scene';
import { Steps } from '~/types';
import sono from 'sono';

export class MemoryScene extends Scene {

  constructor(...args) {
    super(...args);

    this.cameraman.position.set(0, 0, 5);
    this.scene.add(this.cameraman);

    this.cube1_geom = new SphereGeometry(1.5, 20, 20);
    this.material_cube1 = new MeshBasicMaterial( { color: 0xd5d5d5, wireframe: true, side: DoubleSide } );

    this.cubeObject = new Object3D();
    this.scene.add(this.cubeObject);

    this.cube1 = new Mesh(this.cube1_geom, this.material_cube1);
    this.cube1.rotation.x = 1;
    this.cubeObject.add(this.cube1);

    this.light = new AmbientLight( 0x404040, 3 );
    this.scene.add(this.light);

    this.initialGeomVertices = [];
    this.saveVertices();

  }

  saveVertices() {
    for (let i = 0; i < this.cube1.geometry.vertices.length; i++) {
      this.initialGeomVertices[i] = {};
      this.initialGeomVertices[i].x = this.cube1.geometry.vertices[i].x;
      this.initialGeomVertices[i].y = this.cube1.geometry.vertices[i].y;
      this.initialGeomVertices[i].z = this.cube1.geometry.vertices[i].z;
    }
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

    // Particle Texture
    if (_.isNil(this.cube1.material.map)) {
      this.cube1.material.map = this.app.assetsManager.getAsset(`particle2Texture`);
    }
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

    const scale = this.analyser.getFrequencies()[ 8 ] / 100;

    // this.cube1.scale.x = .3 + (scale / 5);
    // this.cube1.scale.y = .3 + (scale / 5);
    // this.cube1.scale.z = .3 + (scale / 5);

    for (let i = 0; i < this.cube1.geometry.vertices.length; i++) {
      this.cube1.geometry.vertices[i].x = this.initialGeomVertices[i].x * (this.analyser.getFrequencies()[i] / 100);
      this.cube1.geometry.vertices[i].y = this.initialGeomVertices[i].y * (this.analyser.getFrequencies()[i] / 300);
      this.cube1.geometry.vertices[i].z = this.initialGeomVertices[i].z * (this.analyser.getFrequencies()[i] / 100);
    }

    this.cube1.geometry.verticesNeedUpdate = true;

  }

}
