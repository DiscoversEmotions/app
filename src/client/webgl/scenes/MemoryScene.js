import {
  PointLight, Object3D, MeshPhongMaterial, Mesh, BoxGeometry,SphereGeometry, MeshBasicMaterial, AmbientLight, DoubleSide, Line, LineBasicMaterial, Vector3, Geometry, Color, PointsMaterial, Points, AdditiveBlending, PlaneGeometry, MeshLambertMaterial
} from 'three';
import { ConnectMethod } from '~/core';
import { Scene } from './Scene';
import { Steps } from '~/types';
import sono from 'sono';
import * as motion from 'popmotion';

export class MemoryScene extends Scene {

  constructor(...args) {
    super(...args);

    // Init watchers
    this.updateKeys({}, this.controller, this);

    this.cameraman.position.set(0, 0, 5);
    this.scene.add(this.cameraman);

    this.cube1_geom = new SphereGeometry(1.5, 20, 20);
    this.material_cube1 = new MeshBasicMaterial( { color: 0xd5d5d5, wireframe: true, side: DoubleSide } );

    this.cubeObject = new Object3D();
    this.scene.add(this.cubeObject);

    this.cube1 = new Mesh(this.cube1_geom, this.material_cube1);
    this.cube1.rotation.x = 1;
    this.cubeObject.add(this.cube1);

    this.cube1Light = new PointLight({
      color: 0xff0000,
      intensity: 5
    });
    this.cubeObject.add(this.cube1Light);

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

  // Keyboard Method
  @ConnectMethod(
    {
      keys: `keyboard.keys`
    }
  )
  updateKeys({ keys }) {
    if (keys.k) {
      this.memorySound.stop();
      this.controller.getSignal(`app.setNextStep`)();
      this.solved = true;
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

    this.croquisMaterial = new MeshLambertMaterial({ map : this.memoryCroquis, side: DoubleSide, transparent: true, opacity: 0 });
    this.croquisGeom = new PlaneGeometry(3, 3);
    this.croquis = new Mesh(this.croquisGeom, this.croquisMaterial);
    this.croquis.position.set(0, 0, 0);
    this.scene.add(this.croquis);

    this.memorySound = sono.createSound(this.momoryBuffer);
    this.memorySound.on(`ended`, () => {
      this.controller.getSignal(`app.setNextStep`)();
      this.solved = true;
    });
    this.analyser = sono.effect.analyser({
      fftSize: 256,
      smoothingTimeConstant: 0.7
    });
    this.memorySound.play();
  }

  mountMemory1() {
    this.momoryBuffer = this.app.assetsManager.getAsset(`memory_love`);
    this.memoryCroquis = this.app.assetsManager.getAsset(`memory_love_croquis`);
  }

  mountMemory2() {
    this.momoryBuffer = this.app.assetsManager.getAsset(`memory_anger`);
    this.memoryCroquis = this.app.assetsManager.getAsset(`memory_anger_croquis`);
  }

  mountMemory3() {
    this.momoryBuffer = this.app.assetsManager.getAsset(`memory_sadness`);
    this.memoryCroquis = this.app.assetsManager.getAsset(`memory_sad_croquis`);
  }

  unmount() {
    this.scene.remove(this.croquis);
    this.croquis = null;
  }


  getEnvConfig() {
    return {
      // background: new Color(0xffffff)
    };
  }

  update(time, dt) {
    // this.cube1.rotation.x += 0.01;
    // this.cube1.rotation.y += 0.02;

    for (let i = 0; i < this.cube1.geometry.vertices.length; i++) {
      this.cube1.geometry.vertices[i].x = this.initialGeomVertices[i].x * (this.analyser.getFrequencies()[i] / 100);
      this.cube1.geometry.vertices[i].y = this.initialGeomVertices[i].y * (this.analyser.getFrequencies()[i] / 300);
      this.cube1.geometry.vertices[i].z = this.initialGeomVertices[i].z * (this.analyser.getFrequencies()[i] / 100);
    }

    this.cube1.geometry.verticesNeedUpdate = true;

    if (this.solved === false) {
      const soundProgress = this.memorySound.currentTime / this.memorySound.duration;
      this.croquis.material.opacity = motion.calc.dilate(0, 0.5, soundProgress);
      this.croquis.scale.x = motion.calc.dilate(1.2, 1.6, soundProgress);
      this.croquis.scale.y = motion.calc.dilate(1.2, 1.6, soundProgress);
      this.croquis.rotation.z = motion.calc.dilate(0, 0.5, soundProgress);
    }

  }

}
