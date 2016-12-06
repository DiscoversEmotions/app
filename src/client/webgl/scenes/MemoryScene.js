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

    this.cube1_geom = new SphereGeometry(1.5, 20, 20);
    this.material_cube1 = new MeshBasicMaterial( { color: 0xd5d5d5, wireframe: true, side: DoubleSide } );

    this.cubeObject = new Object3D();
    this.scene.add(this.cubeObject);

    this.cube1 = new Mesh(this.cube1_geom, this.material_cube1);
    this.cube1.rotation.x = 1;
    this.cubeObject.add(this.cube1);

    this.colorLight = new PointLight({ color: 0xff0000 });
    this.colorLight.position.y = 1;
    this.colorLight.intensity = 0.7;
    this.cubeObject.add(this.colorLight);

    // this.circle_geom = new Geometry();
    // this.material_circle = new LineBasicMaterial({color:0xf9f9f9});
    // this.circle = new Line(this.circle_geom, this.material_circle);

    // var radius=5;
    // var obj_resolution = 360;

    // for (var i = 0; i <=  obj_resolution; i++) {
    //   var angle = Math.PI/180*i;
    //   var x = (radius) * Math.cos(angle);
    //   var y = (radius) * Math.sin(angle);
    //   var z = 0;
    //   this.circle.geometry.vertices.push(new Vector3(x, y, z));
    // }
    // this.scene.add(this.circle);

    // this.light = new AmbientLight( 0x404040, 3 );
    // this.scene.add(this.light);

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
