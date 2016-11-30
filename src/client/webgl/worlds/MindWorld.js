import { Cameraman, OBJLoader } from '~/webgl';
import {
  PointLight, Object3D, Raycaster, SkinnedMesh, AnimationMixer, MeshPhongMaterial,
  Color, SphereGeometry, BackSide, Mesh
} from 'three';
import _ from 'lodash';
import { Worlds } from '~/types';
import { ConnectMethod } from '~/core';
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
    this.scene.name = `MindWorld-scene`;

    this.world1 = null;
    this.perso = null;

    this.userPosition = new Object3D();
    // this.userPosition.position.set(0, 5, 0);
    this.cameraman = new Cameraman(45, 1, 1, 1100);
    this.cameraman.position.set(0, 3, 7);
    this.cameraman.setVerticalAngle(-0.3);

    this.userPosition.add(this.cameraman);
    this.scene.add(this.userPosition);

    this.light = new PointLight();
    this.light.position.y = 20;
    this.scene.add(this.light);

    this.raycaster = new Raycaster();

    this.mixer;
    this.mixerArray = [];

    this.collidableMeshList = [];

    this.isMouseDown = false;

    this.scene.updateMatrixWorld(true);

    // Bind
    this._onMouseMove = _.throttle(this._onMouseMove.bind(this), 1000 / 60);

    this.updateKeyEvent({}, this.controller, this);

    this.persoMaterial = new MeshPhongMaterial({
      color: 0xff0000,
      specular: 0x009900,
      shininess: 30,
      shading: 1
    });
  }

  getEnvConfig() {
    return {
      fogDensity: 0.05,
      fogColor: new Color(0x000000)
    };
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
    this.userLeft = keys.left;
    this.userRight = keys.right;
    this.userDown = keys.down;
    this.userUp = keys.up;
    this.userZ = keys.z;
    this.userS = keys.s;
    this.userQ = keys.q;
    this.userD = keys.d;

  }

  update(time, dt) {

    const movement = {
      forward: 0,
      left: 0
    };

    if((this.userLeft && !this.userRight) || (this.userQ && !this.userD)){
      movement.left = 1;
    }
    if((this.userRight && !this.userLeft) || (this.userD && !this.userQ)) {
      movement.left = -1;
    }
    if((this.userUp && !this.userDown) || (this.userZ && !this.userS)){
      movement.forward = 1;
    }
    if((this.userDown && !this.userUp) || (this.userS && !this.userZ)) {
      movement.forward = -1;
    }

    this.light.position.x = Math.sin(time/5000) * 100;
    this.light.position.z = Math.cos(time/5000) * 100;

    this.userPosition.translateZ(-(dt * 0.010) * movement.forward);
    this.userPosition.translateX(-(dt * 0.010) * movement.left);
    const angle = motion.calc.degreesToRadians(motion.calc.angle(
      { y: movement.forward, x: 0 },
      { y: 0, x: -movement.left}
    ));
    this.persoMesh.rotation.y = angle;

    // Collision with ground
    this.raycaster.ray.origin.copy(this.userPosition.position);
    this.raycaster.ray.origin.y += 5;
    this.raycaster.ray.direction.set(0, -1, 0);
    this.collisionResults = this.raycaster.intersectObjects(this.collidableMeshList, true);
    if (this.collisionResults.length) {
      this.userPosition.position.y = this.collisionResults[0].point.y;
    }

    this._updateCameraman();

    // Annin
    this.mixerFinal = this.mixerArray[0];
    if(this.mixerFinal){
      this.mixerFinal.update(time, dt);
    }

    this.idle.play();

  }

  mount() {
    if ( this.world1 === null) {
      this.world1 = this.app.assetsManager.getAsset(`world2`);
      this.scene.add(this.world1);

      this.world1.traverseVisible((item) => {
        if (item.name === `sol`) {
          this.ground = item;
        }
        if (item.name === `rock`) {
          this.rocks = item;
        }
      });

      this.collidableMeshList.push(this.ground);
      this.collidableMeshList.push(this.rocks);

      //SKY
      this.skyGeo = new SphereGeometry(100, 60, 60);
      this.skyMaterial = new MeshPhongMaterial({ color: 0x000000 });
      this.skyMaterial.side = BackSide;

      this.sky = new Mesh(this.skyGeo, this.skyMaterial);
      this.scene.add(this.sky);
    }

    if(this.perso === null){

      this.perso = this.app.assetsManager.getAsset(`perso`).children[0];
      this.persoMesh = new SkinnedMesh(this.perso.geometry, this.persoMaterial);
      this.persoMesh.scale.set(0.015, 0.015, 0.015);
      this.userPosition.add(this.persoMesh);

      this.mixer = new AnimationMixer(this.persoMesh);
      this.idle = this.mixer.clipAction(this.persoMesh.geometry.animations[0]);

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

    // this.cameramanRotation.vert = motion.calc.restrict(this.cameramanRotation.vert, -0.5, 0);
    this.cameramanRotation.vert = this.cameramanRotation.vert;
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

}
