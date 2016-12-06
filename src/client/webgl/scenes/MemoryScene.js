import {
  PointLight, Object3D, AudioListener, Audio, AudioAnalyser, MeshPhongMaterial, Mesh, BoxGeometry,SphereGeometry, MeshBasicMaterial, AmbientLight, DoubleSide, Line, LineBasicMaterial, Vector3, Geometry, Color
} from 'three';
import { Scene } from './Scene';
import { Steps } from '~/types';

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

    // this.light = new PointLight();
    // // this.light.position.y = 0;
    // this.light.position.set( 50, 50, 50 );
    // this.scene.add(this.light);

    this.light = new AmbientLight( 0x404040, 3 );
    this.scene.add(this.light);

    this.audioListener = new AudioListener();
    this.memorySound = new Audio(this.audioListener);
    console.log(this.memorySound);
    this.scene.add(this.memorySound);

    this.analyser1 = new AudioAnalyser(this.memorySound, 32);

    this.isPlaySound = false;

    // this.radius = 5;
    // this.circle_resolution = 360;
    // this.circleGeom = new Geometry();

    // for (var i = 0; i < this.circle_resolution; i++) {
    //   var angle = Math.PI/180*i;
    //   var x = (this.radius) * Math.cos(angle);
    //   var y = (this.radius) * Math.sin(angle);
    //   var z = 0;
    //   this.circleLine = new Vector3(x, y, z);

    //   this.circleGeom.vertices.push(this.circleLine);
    // }

    // this.circle = new Line(this.circleGeom, new LineBasicMaterial({color:0xffffff}));
    // this.scene.add(this.circle);

    // console.log(this.circle);

    


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
      background: new Color(0xffffff)
    };
  }

  update(time, dt) {
    // this.cube1.rotation.x += 0.01;
    // this.cube1.rotation.y += 0.02;

    // const audioLvl = this.analyser1.getAverageFrequency() / 256;
    // const audioLvl = this.analyser1.getFrequencyData()[ 8 ] / 256;
    const scale = this.analyser1.getFrequencyData()[ 8 ] / 256;

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
