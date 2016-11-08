import { Cube, Ground, RoomSphere } from '~/webgl/meshes';
import { Camera } from '~/webgl';
import { PointLight, Object3D } from 'three';

export class RoomWorld {

  constructor(stateManager) {
    this.stateManager = stateManager;

    this.scene = new Object3D();
    this.camera = new Camera(75, 1, 1, 1100);
    this.camera.position.set(0, 2, -5);
    this.camVert = 0;
    this.scene.add(this.camera);

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
  }

  getCamera() {
    return this.camera.camera;
  }

  getScene() {
    return this.scene;
  }

  update(time, dt) {
    this.camVert += 0.01;
    this.camera.setHorizontalAngle((Math.PI * 1.5));
    this.camera.setVerticalAngle(Math.sin(this.camVert));
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;
    this.cube2.rotation.x += 0.02;
    this.cube2.rotation.y += 0.01;
  }

  setSize(width, height) {
    this.camera.setSize(width, height);
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
  //   this.renderPass = new RenderPass(this.scene, this.camera);
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
  //   this.camera.rotation.y = - offset.x / this.width * 2;
  //   // this.camVertical.rotation.x = - offset.y / this.height;
  // }

}
