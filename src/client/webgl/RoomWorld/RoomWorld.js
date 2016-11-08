import { Cube, Ground, RoomSphere } from '~/webgl/meshes';
import { Cameraman } from '~/webgl';
import { PointLight, Object3D } from 'three';

export class RoomWorld {

  constructor(stateManager) {
    this.stateManager = stateManager;

    this.scene = new Object3D();
    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 2, -5);
    this.camVert = 0;

    this.roomSphere = new RoomSphere();
    this.scene.add(this.roomSphere);
    this.cube1 = new Cube();
    this.cube1.position.x = 1;
    this.scene.add(this.cube1);
    this.cube2 = new Cube();
    this.cube2.position.x = -1;
    this.scene.add(this.cube2);
    this.ground = new Ground();
    this.ground.position.y = -1;
    this.scene.add(this.ground);
    var light = new PointLight();
    light.position.y = 5;
    this.scene.add(light);

    this.cameraman.setHorizontalAngle(Math.PI * 1.5);

    this.rootObject = new Object3D();
    this.rootObject.add(this.scene);
    this.rootObject.add(this.cameraman);
  }

  getCameraman() {
    return this.cameraman;
  }

  getRootObject() {
    return this.rootObject;
  }

  getScene() {
    return this.scene;
  }

  update(time, dt) {
    this.camVert += 0.01;
    this.cameraman.setHorizontalAngle((Math.PI * 1.5) + Math.sin(this.camVert) * 0.5);
    // this.cameraman.setVerticalAngle(Math.sin(this.camVert));
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;
    this.cube2.rotation.x += 0.02;
    this.cube2.rotation.y += 0.01;
  }

  setSize(width, height) {
    this.cameraman.setSize(width, height);
  }

  // initAssetsManager() {
  //   var manager = super.initAssetsManager();
  //   var texture = new Texture();
  // }
  //
  // initScene() {
  //   return new Scene();
  // }
  //
  // initCamera(parentElement) {
  //   var camera = new Camera(parentElement, 75, this.width / this.height, 1, 1100, false);
  //   return camera;
  // }
  //
  // initPostComposer() {
  //   const composer = new EffectComposer(this.renderer);
  //   this.renderPass = new RenderPass(this.scene, this.cameraman);
  //   this.renderPass.renderToScreen = true;
  //   composer.addPass(this.renderPass);
  //   return composer;
  // }
  //
  // addEvents() {
  //   document.addEventListener(`mousemove`, this.onMouseMove.bind(this), false );
  // }
  //
  // onMouseMove(e) {
  //   const offset = EventUtils.getOffsetOf(e, this.parentElement);
  //   this.cameraman.rotation.y = - offset.x / this.width * 2;
  //   // this.camVertical.rotation.x = - offset.y / this.height;
  // }

}
