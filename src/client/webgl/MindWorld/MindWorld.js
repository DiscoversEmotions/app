import {
  Cube,
  Ground,
  Tile
} from '~/webgl/meshes';
import {
  Cameraman,
  OBJLoader
} from '~/webgl';
import {
  PointLight,
  Object3D,
  LoadingManager,
  Mesh,
  Raycaster,
  JSONLoader,
  SkinnedMesh,
  MeshFaceMaterial,
  MeshStandardMaterial,
  ObjectLoader,
  Vector3,
  AnimationMixer
} from 'three';
import _ from 'lodash';
import { Steps, Worlds } from '~/types';
import {
  PointerLock
} from '~/core';
import * as motion from 'popmotion';

export class MindWorld {

  constructor(name, controller, parentElement) {
    this.name = name;
    this.controller = controller;
    this.parentElement = parentElement;

    this.cameramanRotation = {
      vert: 0,
      hori: 0
    };

    this.scene = new Object3D();

    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 3, 7);
    this.cameraman.setVerticalAngle(-0.3);

    this.light = new PointLight();
    this.light.position.y = 20;
    this.scene.add(this.light);

    this.userPosition = new Object3D();
    this.scene.add(this.userPosition);
    this.userPosition.add(this.cameraman);

    this.tile = new Tile();
    this.scene.add(this.tile);
    this.tile.position.y = 0.1;
    this.tile.position.z = -5;

    this.user = new Cube();
    this.user.position.y = 0;

    this.pointerLock = new PointerLock(document.body);

    this.raycaster = new Raycaster();

    this.mixer;
    this.mixerArray = [];

    this.scene.updateMatrixWorld(true);

    // Bind
    this._onMouseMove = _.throttle(this._onMouseMove.bind(this), 1000 / 60);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
  }

  getCameraman() {
    return this.cameraman;
  }

  getScene() {
    return this.scene;
  }

  update(time, dt) {

    const step = this.store.get(`step`);

    if (step === Steps.RecoveryLvl1) {
      const movement = this.store.get(`movement`).toJS();
      this.userPosition.translateZ(-(dt * 0.01) * movement.forward);
      this.userPosition.translateX(-(dt * 0.01) * movement.left);
      const angle = motion.calc.degreesToRadians(motion.calc.angle(
        { y: movement.forward, x: 0 },
        { y: 0, x: -movement.left}
      ));
      this.persoFinalMesh.rotation.y = angle;
    }

    // Collision with ground
    this.raycaster.ray.origin.copy(this.userPosition.position);
    this.raycaster.ray.origin.y += 5;
    this.raycaster.ray.direction.set(0, -1, 0);
    this.collisionResults = this.raycaster.intersectObjects([this.ground], true);
    if (this.collisionResults.length) {
      this.userPosition.position.y = this.collisionResults[0].point.y;
    }

    this._updateCameraman();
    this._updateMenu();

    // Annin
    this.mixerFinal = this.mixerArray[0];
    if(this.mixerFinal){
      this.mixerFinal.update(time, dt);
    }

  }

  mount(time) {
    document.addEventListener(`mousemove`, this._onMouseMove, false);
    document.addEventListener(`keydown`, this._onKeyDown, false);
    document.addEventListener(`keyup`, this._onKeyUp, false);
    document.addEventListener(`mousedown`, this._onMouseDown, false);
    document.addEventListener(`mouseup`, this._onMouseUp, false);
  }

  unmount(time) {
    document.removeEventListener(`mousemove`, this._onMouseMove, false);
    document.removeEventListener(`keydown`, this._onKeyDown, false);
    document.removeEventListener(`keyup`, this._onKeyUp, false);
    document.removeEventListener(`mousedown`, this._onMouseDown, false);
    document.removeEventListener(`mouseup`, this._onMouseUp, false);
  }

  setSize(width, height) {
    this.cameraman.setSize(width, height);
  }

  _onMouseMove(e) {
    var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    this.cameramanRotation.hori -= movementX * 0.003;
    this.cameramanRotation.vert -= movementY * 0.003;

    this.cameramanRotation.vert = motion.calc.restrict(this.cameramanRotation.vert, -0.5, 0);
  }

  _onKeyDown(e) {
    switch (e.keyCode) {
    case 38: // up
    case 90: // z
      this.store.actions.movement.setForward(1);
      break;
    case 37: //left
    case 81: //q
      this.store.actions.movement.setLeft(1);
      break;
    case 40: //back
    case 83: //s
      this.store.actions.movement.setForward(-1);
      break;
    case 39: //right
    case 68: //d
      this.store.actions.movement.setLeft(-1);
      break;
    };
  }

  _onKeyUp(e) {
    switch (e.keyCode) {
    case 38: // up
    case 90: // w
    case 40: //back
    case 83: //s
      this.store.actions.movement.setForward(0);
      break;
    case 37: //left
    case 81: //q
    case 39: //right
    case 68: //d
      this.store.actions.movement.setLeft(0);
      break;
    };
  }

  _onMouseDown(e) {
    this.store.actions.movement.setForward(1);
  }

  _onMouseUp(e) {
    this.store.actions.movement.setForward(0);
  }

  _updateCameraman() {
    // this.cameraman.setHorizontalAngle(this.cameramanRotation.hori);
    this.userPosition.rotation.y = this.cameramanRotation.hori;
    this.cameraman.setVerticalAngle(this.cameramanRotation.vert);
  }

  _updateMenu() {

  }

  _updatePointerLock(state) {
    const shouldBe = [Worlds.Mind].indexOf(this.store.getComputed(`world`)) > -1;
    if(shouldBe !== this.pointerLock.isActivated()) {
      if (shouldBe) {
        this.pointerLock.tryActivate();
      } else {
        this.pointerLock.deactivate();
      }
    }
  }

}
