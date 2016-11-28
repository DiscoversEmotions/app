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
  AnimationMixer,
  AmbientLight,
  MeshPhongMaterial,
  FlatShading,
  Color
} from 'three';
import _ from 'lodash';
import { Steps, Worlds } from '~/types';
import {
  PointerLock,
  ConnectMethod
} from '~/core';
import * as motion from 'popmotion';


export class MindWorld {

  constructor(app, controller, parentElement) {
    this.app = app;
    this.controller = controller;
    this.parentElement = parentElement;

    this.cameramanRotation = {
      vert: 0,
      hori: 0
    };

    this.scene = new Object3D();

    this.world1 = null;

    this.userPosition = new Object3D();
    this.userPosition.position.set(0, 5, 0);
    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.setVerticalAngle(-0.3);
    this.user = new Cube();
    // this.user.position.z = 5;
    this.userPosition.add(this.user);
    this.userPosition.add(this.cameraman);
    this.scene.add(this.userPosition);

    this.light = new PointLight();
    this.light.position.y = 20;
    this.scene.add(this.light);

    this.ambiantLight = new AmbientLight( 0x404040 );
    this.scene.add(this.ambiantLight);

    this.tile = new Tile();
    this.scene.add(this.tile);
    this.tile.position.y = 0.1;
    this.tile.position.z = -5;

    this.pointerLock = new PointerLock(document.body);

    this.raycaster = new Raycaster();

    this.mixer;
    this.mixerArray = [];

    this.scene.updateMatrixWorld(true);

    // Bind
    this._onMouseMove = _.throttle(this._onMouseMove.bind(this), 1000 / 60);

    this.updateKeyEvent({}, this.controller, this);

  }

  getCameraman() {
    return this.cameraman;
  }

  getScene() {
    return this.scene;
  }

  // Keyboard Method
  @ConnectMethod(
    {
      keys: `keyboard.keys`
    }
  )
  updateKeyEvent({ keys }) {
    if(keys.left){
      this.userLeft = true;
    } else if (keys.right){
      this.userRight = true;
    } else if (keys.down){
      this.userDown = true;
    } else if (keys.up){
      this.userUp = true;
    }

    else {
      this.userLeft = false;
      this.userRight = false;
      this.userDown = false;
      this.userUp = false;
    }
  }

  update(time, dt) {

    const movement = {
      forward: 0,
      left: 0
    };
    this.userPosition.translateZ(-(dt * 0.01) * movement.forward);
    this.userPosition.translateX(-(dt * 0.01) * movement.left);
    // const angle = motion.calc.degreesToRadians(motion.calc.angle(
    //   { y: movement.forward, x: 0 },
    //   { y: 0, x: -movement.left}
    // ));
    // this.persoFinalMesh.rotation.y = angle;

    // Collision with ground
    // this.raycaster.ray.origin.copy(this.userPosition.position);
    // this.raycaster.ray.origin.y += 5;
    // this.raycaster.ray.direction.set(0, -1, 0);
    // this.collisionResults = this.raycaster.intersectObjects([this.ground], true);
    // if (this.collisionResults.length) {
    //   this.userPosition.position.y = this.collisionResults[0].point.y;
    // }

    this._updateCameraman();
    this._updateMenu();

    // Annin
    this.mixerFinal = this.mixerArray[0];
    if(this.mixerFinal){
      this.mixerFinal.update(time, dt);
    }

    if(this.userLeft){
      this.userPosition.translateX(-(dt * 0.01));
    } 
    else if(this.userRight){
      this.userPosition.translateX((dt * 0.01));
    } 
    else if(this.userUp){
      this.userPosition.translateZ(-(dt * 0.01));
    }
    else if(this.userDown){
      this.userPosition.translateZ((dt * 0.01));
    }

  }

  mount() {
    if ( this.world1 === null) {
      this.world1 = this.app.assetsManager.getAsset(`world2`);
      this.scene.add(this.world1);

      // this.world1.position.set(-150, 0, -180);

      // this.world1.scale.set(0.1, 0.1, 0.1);
    }

    document.addEventListener(`mousemove`, this._onMouseMove, false);
  }

  unmount() {
    document.removeEventListener(`mousemove`, this._onMouseMove, false);
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
  

  _onMouseDown(e) {
    // this.store.actions.movement.setForward(1);
  }

  _onMouseUp(e) {
    // this.store.actions.movement.setForward(0);
  }

  _updateCameraman() {
    // this.cameraman.setHorizontalAngle(this.cameramanRotation.hori);
    this.userPosition.rotation.y = this.cameramanRotation.hori;
    this.cameraman.setVerticalAngle(this.cameramanRotation.vert);

  }

  _updateMenu() {

  }

  // _updatePointerLock(state) {
  //   const shouldBe = [Worlds.Mind].indexOf(this.store.getComputed(`world`)) > -1;
  //   if(shouldBe !== this.pointerLock.isActivated()) {
  //     if (shouldBe) {
  //       this.pointerLock.tryActivate();
  //     } else {
  //       this.pointerLock.deactivate();
  //     }
  //   }
  // }

}
