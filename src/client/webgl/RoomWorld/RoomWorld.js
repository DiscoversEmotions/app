import { Cube, Ground, RoomSphere } from '~/webgl/meshes';
import { Cameraman } from '~/webgl';
import { EventUtils } from '~/core';
import { PointLight, Object3D } from 'three';
import _ from 'lodash';

export class RoomWorld {

  constructor(stateManager, parentElement) {
    this.stateManager = stateManager;
    this.parentElement = parentElement;

    this.scene = new Object3D();
    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 2, -5);
    this.camVert = 0;
    this.width = 600;
    this.height = 600;
    this.mousePos = { x: 0, y: 0 };

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

    // Bind
    this._onMouseMove = _.throttle(this._onMouseMove.bind(this), 1000/60);
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

  mount(time) {
    console.log(`mount`);
    document.addEventListener(`mousemove`, this._onMouseMove, false);
  }

  unmount(time) {
    document.removeEventListener(`mousemove`, this._onMouseMove, false);
  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.02;
    this.cube2.rotation.x += 0.02;
    this.cube2.rotation.y += 0.01;
    this._updateCameraman();
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.cameraman.setSize(width, height);
  }

  _onMouseMove(e) {
    const offset = EventUtils.getOffset(e);
    this.mousePos.x = ((offset.x / this.width) * 2) - 0.5;
    this.mousePos.y = ((offset.y / this.height) * 2) - 0.5;
  }

  _updateCameraman() {
    this.cameraman.setHorizontalAngle((Math.PI * 1.5) - 2 * this.mousePos.x);
    this.cameraman.setVerticalAngle(- 1 * this.mousePos.y);
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
