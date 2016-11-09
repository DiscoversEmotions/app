import {
  Cube,
  Ground
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
  Raycaster
} from 'three';
import _ from 'lodash';
import * as actions from '~/actions';
import { PointerLock } from '~/core';

export class MindWorld {

  constructor(stateManager, parentElement) {
    this.stateManager = stateManager;
    this.parentElement = parentElement;

    this.cameramanRotation = {
      vert: 0,
      hori: 0
    };

    // this.pointerLock = new PointerLock(this.parentElement, this._onPointerLockChange.bind(this));
    // _onPointerLockChange(pointerLocked) {
    //   this.stateManager.updateState(actions.movement.setPointerLock(pointerLocked));
    // }

    this.scene = new Object3D();

    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 3, 7);
    this.cameraman.setVerticalAngle(-0.3);

    this.light = new PointLight();
    this.light.position.y = 5;
    this.scene.add(this.light);

    this.userPosition = new Object3D();
    this.scene.add(this.userPosition);
    this.userPosition.add(this.cameraman);

    this.user = new Cube();
    this.user.position.y = 0.5;
    this.userPosition.add(this.user);

    this.raycaster = new Raycaster();
    this.collidableMeshList = [];

    //////////////////
    this.manager = new LoadingManager();
    this.manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total);
    };
    var onProgress = function (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(`${Math.round(percentComplete, 2)}% downloaded`);
      }
    };
    var onError = function (xhr) {};
    var loader = new OBJLoader(this.manager);
    loader.load(require(`~/webgl/meshes/Ground/plane.obj`), (object) => {
      object.traverse((child) => {
        if (child instanceof Mesh) {
          // child.material = this.scene.cube1.material;
          // child.scale.set(1, 1, 1);
          this.scene.add(child);
          this.collidableMeshList.push(child);
        }
      });
      object.position.y = 1;

    }, onProgress, onError);
    //////////////////

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
    const forward = this.stateManager.state.getIn([`movement`, `forward`]);
    if (forward) {
      this.userPosition.translateZ(-(dt * 0.01));
    }

    // this.raycaster.ray.origin.copy(this.userPosition.position);
    const originPoint = 5;
    this.raycaster.ray.origin.set(this.userPosition.position.x, originPoint, this.userPosition.position.z);
    this.raycaster.ray.direction.set(0, -.5, 0);

    this.collisionResults = this.raycaster.intersectObjects( this.collidableMeshList, true );

    if(this.collisionResults.length){
      this.userPosition.position.y = this.collisionResults[0].point.y;

    }

    this._updateCameraman();
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
  }

  _onKeyDown(e) {
    switch (e.keyCode) {
    case 38: // up
    case 90: // w
      this.stateManager.updateState(actions.movement.setForward(true));
      break;
    };
  }

  _onKeyUp(e) {
    switch (e.keyCode) {
    case 38: // up
    case 90: // w
      this.stateManager.updateState(actions.movement.setForward(false));
      break;
    };
  }

  _onMouseDown(e) {
    this.stateManager.updateState(actions.movement.setForward(true));
  }

  _onMouseUp(e) {
    this.stateManager.updateState(actions.movement.setForward(false));
  }

  _updateCameraman() {
    // this.cameraman.setHorizontalAngle(this.cameramanRotation.hori);
    this.userPosition.rotation.y = this.cameramanRotation.hori;
    this.cameraman.setVerticalAngle(this.cameramanRotation.vert);
  }

}
