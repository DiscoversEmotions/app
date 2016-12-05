import {
  PointLight, Object3D, Raycaster, MeshPhongMaterial, MeshBasicMaterial, ArrowHelper,
  Color, SphereGeometry, BackSide, Mesh, Vector3, PointsMaterial, Geometry, Points, AdditiveBlending
} from 'three';
import _ from 'lodash';
import { ConnectMethod } from '~/core';
import * as motion from 'popmotion';
import { Scene } from './Scene';
import { Steps } from '~/types';
import { BlendCharacter } from '~/webgl/utils';

export class EmotionScene extends Scene {

  constructor(...args) {
    super(...args);

    this.cameramanRotation = {
      vert: 0,
      hori: 0
    };

    this.world1 = null;
    this.perso = null;
    this.collision = null;
    this.tile = null;

    this.userPosition = new Object3D();
    this.userPosition.position.set(0, 5, 0);
    this.scene.add(this.userPosition);

    this.cameraman.position.set(0, 3, 7);
    this.cameraman.setVerticalAngle(-0.3);
    this.userPosition.add(this.cameraman);

    this.persoVelocity = 0;
    this.persoLight = new PointLight({
      color: 0xff0000
    });
    this.persoLight.position.y = 2;
    this.persoLight.intensity = 0.7;
    this.userPosition.add(this.persoLight);

    this.raycaster = new Raycaster();

    this.mixer = null;
    this.mixerArray = [];
    this.groundCollision = [];
    this.tileCollision = [];
    this.isMouseDown = false;

    this.rayHelper = new ArrowHelper(new Vector3(0, -1, 0), new Vector3(0, 10, 0), 20 ,0xffff00);
    this.scene.add(this.rayHelper);
    this.rayHelper2 = new ArrowHelper(new Vector3(0, -1, 0), new Vector3(0, 10, 0), 20 ,0x0000ff);
    this.scene.add(this.rayHelper2);

    //SKY
    this.skyGeo = new SphereGeometry(100, 60, 60);
    this.skyMaterial = new MeshPhongMaterial({ color: 0x000000 });
    this.skyMaterial.side = BackSide;
    this.sky = new Mesh(this.skyGeo, this.skyMaterial);
    // this.scene.add(this.sky);

    // Bind
    this._onMouseMove = _.throttle(this._onMouseMove.bind(this), 1000 / 60);

    this.updateKeyEvent({}, this.controller, this);

    this.persoMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });

    this.particles = null;
    this.particlesGeom = new Geometry();
    this.particleCount = 320;

  }

  getEnvConfig() {
    return {
      fogDensity: 0.03,
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

    const isMoving = (movement.forward !== 0 || movement.left !== 0);

    const angle = motion.calc.degreesToRadians(motion.calc.angle(
      { y: movement.forward, x: 0 },
      { y: 0, x: -movement.left}
    ));


    if (isMoving) {
      this.persoVelocity += 0.0001;
    } else if (this.persoVelocity > 0) {
      this.persoVelocity -= 0.005;
    }
    this.persoVelocity = motion.calc.restrict(this.persoVelocity, 0, 0.02);

    const dist = this.persoVelocity * dt;

    const move = motion.calc.pointFromAngleAndDistance(
      { x: 0, y: 0 },
      motion.calc.radiansToDegrees(angle),
      dist
    );

    const distCanMove = dist < 0.1 ? 0.2 : dist * 2;

    const canMove = motion.calc.pointFromAngleAndDistance(
      { x: 0, y: 0 },
      motion.calc.radiansToDegrees(angle),
      distCanMove
    );
    this.userPosition.translateZ(-canMove.x * 2);
    this.userPosition.translateX(-canMove.y * 2);
    this.raycaster.set(this.userPosition.position, new Vector3(0, -1, 0));
    this.userPosition.translateZ(+canMove.x * 2);
    this.userPosition.translateX(+canMove.y * 2);
    this.raycaster.ray.origin.y += 2;

    this.rayHelper.setDirection(new Vector3(0, -1, 0));
    this.rayHelper.position.copy(this.raycaster.ray.origin);

    const canMoveCollision = this.raycaster.intersectObjects(this.groundCollision);
    if (canMoveCollision.length) {
      // console.log(`ok can move`)
      this.userPosition.translateZ(-move.x);
      this.userPosition.translateX(-move.y);
    } else {
      // console.log(`nope, can't move`);
      this.persoVelocity = 0;
    }

    this.perso.rotation.y = angle;

    if (this.persoVelocity < 0.001) {
      this.perso.applyWeight(`walk`, 0);
      this.perso.applyWeight(`run`, 0);
      this.perso.play(`idle`, 1);
    } else if (this.persoVelocity <= 0.01) {
      this.perso.applyWeight(`idle`, 0);
      this.perso.applyWeight(`run`, 0);
      this.perso.play(`walk`, 1);
    } else {
      this.perso.applyWeight(`idle`, 0);
      this.perso.applyWeight(`walk`, 0);
      this.perso.play(`run`, 1);
    }

    this.perso.update(dt/1000);

    // Collision with ground
    this.raycaster.set(
      this.userPosition.position,
      new Vector3(0, -1, 0)
    );
    this.raycaster.ray.origin.y += 2;

    this.rayHelper2.setDirection(new Vector3(0, -1, 0));
    this.rayHelper2.position.copy(this.raycaster.ray.origin);

    this.collisionGroundResults = this.raycaster.intersectObjects(this.groundCollision);
    if (this.collisionGroundResults.length) {
      this.userPosition.position.y = this.collisionGroundResults[0].point.y;
    } else {
      console.log(`No ground collision`);
    }
    this.collisionTileResults = this.raycaster.intersectObjects(this.tileCollision);
    if (this.collisionTileResults.length && this.solved === false) {
      this.controller.getSignal(`app.setNextStep`)();
      this.solved = true;
    }

    this._updateCameraman();

    // Annin
    // this.mixerFinal = this.mixerArray[0];
    // if(this.mixerFinal){
    //   this.mixerFinal.update(time, dt);
    // }
    //
    // this.idle.play();

    this.particleSystem.rotation.y -= 0.0001;

    this.pCount = this.particleCount;
    this.particleSystem.position.set(-5, -5, -40);

  }

  mount() {
    this.solved = false;

    if ( this.world1 === null) {
      this.world1 = this.app.assetsManager.getAsset(`world1`);
      this.scene.add(this.world1);
      this.world1.updateMatrixWorld();

      this.world1.traverseVisible((item) => {
        console.log(item.name);
        if (item.name === `collision`) {
          this.collision = item;
        }
        if (item.name === `zone-action`) {
          this.tile = item;
        }
      });
      if (this.collision === null || this.tile === null) {
        throw new Error(`Missing someting in awd !`);
      }

      this.collision.material.visible = false;
      this.groundCollision.push(this.collision);
      this.tileCollision.push(this.tile);

    }

    if(this.perso === null){

      this.perso = new BlendCharacter(this.app.assetsManager.getAsset(`perso`));
      this.userPosition.add(this.perso);
      this.perso.scale.set(0.015, 0.015, 0.015);
      this.perso.setMaterial(this.persoMaterial);

      this.perso.play(`walk`, 1);

    }

    if(this.particles === null){

      var sizeParticle = Math.random() * (1.5 - 1);

      this.pMaterial = new PointsMaterial({
        color: 0xFFFFFF,
        size: sizeParticle,
        map: this.app.assetsManager.getAsset(`particleTexture`),
        blending: AdditiveBlending,
        transparent: true
      });

      for (var p = 0; p < this.particleCount; p++) {
        var pX = Math.random() * 50;
        var pY = Math.random() * 10;
        var pZ = Math.random() * 60;
        var particle = new Vector3(pX, pY, pZ);
        // particle.velocity = new Vector3(0, -Math.random(), 0);

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

    this.cameramanRotation.hori %= 1;
    this.cameramanRotation.vert = motion.calc.restrict(this.cameramanRotation.vert, 0, 1);
  }


  _onMouseDown(e) {
    // this.store.actions.movement.setForward(1);
  }

  _onMouseUp(e) {
    // this.store.actions.movement.setForward(0);
  }

  _updateCameraman() {
    // this.cameraman.setHorizontalAngle(this.cameramanRotation.hori);
    this.userPosition.rotation.y = this.cameramanRotation.hori * (Math.PI * 2);
    const dist = motion.calc.dilate(7, 13, this.cameramanRotation.vert);
    const lookUp = motion.calc.dilate(0, 0.3, this.cameramanRotation.vert);
    const angle = motion.calc.dilate(60, 80, this.cameramanRotation.vert);
    const camPos = motion.calc.pointFromAngleAndDistance(
      { x: 3, y: 0 },
      angle,
      dist
    );
    this.cameraman.position.set(0, camPos.x, camPos.y);
    this.cameraman.setVerticalAngle(motion.calc.degreesToRadians(angle - 90));
    // this.cameraman.setVerticalAngle(0);
  }

}
