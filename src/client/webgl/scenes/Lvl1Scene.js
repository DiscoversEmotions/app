import {
  PointLight, Object3D, Raycaster, SkinnedMesh, AnimationMixer, MeshPhongMaterial,
  Color, SphereGeometry, BackSide, Mesh, Vector3, PointsMaterial, Geometry, Points, AdditiveBlending
} from 'three';
import _ from 'lodash';
import { ConnectMethod } from '~/core';
import * as motion from 'popmotion';
import { Scene } from './Scene';

export class Lvl1Scene extends Scene {

  constructor(...args) {
    super(...args);

    this.cameramanRotation = {
      vert: 0,
      hori: 0
    };

    this.world1 = null;
    this.perso = null;
    this.ground = null;
    this.tile = null;

    this.userPosition = new Object3D();
    this.userPosition.position.set(0, 5, 0);
    this.scene.add(this.userPosition);

    this.cameraman.position.set(0, 3, 7);
    this.cameraman.setVerticalAngle(-0.3);
    this.userPosition.add(this.cameraman);

    this.persoLight = new PointLight();
    this.persoLight.position.y = 2;
    this.persoLight.intensity = 1;
    this.userPosition.add(this.persoLight);

    this.raycaster = new Raycaster();

    this.mixer = null;
    this.mixerArray = [];
    this.groundCollision = [];
    this.tileCollision = [];
    this.isMouseDown = false;

    //SKY
    this.skyGeo = new SphereGeometry(100, 60, 60);
    this.skyMaterial = new MeshPhongMaterial({ color: 0x000000 });
    this.skyMaterial.side = BackSide;
    this.sky = new Mesh(this.skyGeo, this.skyMaterial);
    // this.scene.add(this.sky);

    // Bind
    this._onMouseMove = _.throttle(this._onMouseMove.bind(this), 1000 / 60);

    this.updateKeyEvent({}, this.controller, this);

    this.persoMaterial = new MeshPhongMaterial({
      color: 0xff0000,
      specular: 0x009900,
      shininess: 30,
      shading: 1
    });

    this.particles = null;
    this.particlesGeom = new Geometry();
    this.particleCount = 150;

  }

  getEnvConfig() {
    return {
      fogDensity: 0.05,
      fogColor: new Color(0x000000)
    };
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

    // this.light.position.x = Math.sin(time/5000) * 100;
    // this.light.position.z = Math.cos(time/5000) * 100;

    this.userPosition.translateZ(-(dt * 0.01) * movement.forward);
    this.userPosition.translateX(-(dt * 0.01) * movement.left);
    const angle = motion.calc.degreesToRadians(motion.calc.angle(
      { y: movement.forward, x: 0 },
      { y: 0, x: -movement.left}
    ));
    this.persoMesh.rotation.y = angle;

    // Collision with ground
    this.raycaster.set(
      this.userPosition.position,
      new Vector3(0, -1, 0)
    );
    this.raycaster.ray.origin.y += 50;
    this.collisionGroundResults = this.raycaster.intersectObjects(this.groundCollision, true);
    if (this.collisionGroundResults.length) {
      this.userPosition.position.y = this.collisionGroundResults[0].point.y;
    }
    this.collisionTileResults = this.raycaster.intersectObjects(this.tileCollision, true);
    if (this.collisionTileResults.length) {
      // Why is this triggered when the scene start ?
      console.log(`Collision with tile !`);
      const setRecoveryStepDone = this.controller.getSignal(`app.setRecoveryStepDone`);
      console.log(setRecoveryStepDone);
      setRecoveryStepDone({ step: `lvl1` });
    }


    this._updateCameraman();

    // Annin
    this.mixerFinal = this.mixerArray[0];
    if(this.mixerFinal){
      this.mixerFinal.update(time, dt);
    }

    this.idle.play();

    this.particleSystem.rotation.y -= 0.0005;

    this.pCount = this.particleCount;
    this.particleSystem.position.set(-5, -5, -25);

  }

  mount() {
    if ( this.world1 === null) {
      this.world1 = this.app.assetsManager.getAsset(`world1`);
      this.world1.scale.set(0.1, 0.1, 0.1);
      this.scene.add(this.world1);
      this.world1.updateMatrixWorld();

      this.world1.traverseVisible((item) => {
        console.log(item.name);
        if (item.name === `sol`) {
          this.ground = item;
        }
        if (item.name === `zone-action`) {
          this.tile = item;
        }
        if (item.name === `pont`) {
          console.log(`pont !!`, item);
          this.groundCollision.push(item);
        }
      });
      if (this.ground === null || this.tile === null) {
        throw new Error(`Missing someting in awd !`);
      }

      console.log(this.ground);

      this.groundCollision.push(this.ground);
      this.tileCollision.push(this.tile);
      console.log(this.tile);

    }

    if(this.perso === null){

      this.perso = this.app.assetsManager.getAsset(`perso`).children[0];
      this.persoMesh = new SkinnedMesh(this.perso.geometry, this.persoMaterial);
      this.persoMesh.scale.set(0.015, 0.015, 0.015);
      this.userPosition.add(this.persoMesh);

      this.mixer = new AnimationMixer(this.persoMesh);
      this.idle = this.mixer.clipAction(this.persoMesh.geometry.animations[0]);

    }

    if(this.particles === null){

      var sizeParticle = Math.random(4*3);
      
      this.pMaterial = new PointsMaterial({
        color: 0xFFFFFF,
        size: sizeParticle,
        map: this.app.assetsManager.getAsset(`particleTexture`),
        blending: AdditiveBlending,
        transparent: true
      });
  
      for (var p = 0; p < this.particleCount; p++) {
        var pX = Math.random() * 25;
        var pY = Math.random() * 10;
        var pZ = Math.random() * 60;
        var particle = new Vector3(pX, pY, pZ);
        particle.velocity = new Vector3(0, -Math.random(), 0);

        this.particlesGeom.vertices.push(particle);
      }

      this.particleSystem = new Points(this.particlesGeom, this.pMaterial);
      this.particleSystem.sortParticles = true;

      this.scene.add(this.particleSystem);

    }

    document.addEventListener(`mousemove`, this._onMouseMove, false);

  }

  unmount() {
    document.removeEventListener(`mousemove`, this._onMouseMove, false);
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
