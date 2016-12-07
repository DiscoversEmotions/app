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

    // Bind
    this.onMouseMove = _.throttle(this.onMouseMove.bind(this), 1000 / 60);

    // Init watchers
    this.updateKeyEvent({}, this.controller, this);

    // Perso
    this.persoVelocityLinear = 0;
    this.persoMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    this.userPosition = new Object3D();
    this.userPosition.position.set(0, 5, 0);
    this.scene.add(this.userPosition);

    // Light inside perso
    this.persoLight = new PointLight({
      color: 0xff0000
    });
    this.persoLight.position.y = 2;
    this.persoLight.intensity = 0.7;
    this.userPosition.add(this.persoLight);

    // Cameraman
    this.cameramanRotation = {
      vert: 0,
      hori: 0
    };
    this.cameraman.position.set(0, 3, 7);
    this.cameraman.setVerticalAngle(-0.3);
    this.userPosition.add(this.cameraman);

    // Raycaster
    this.raycaster = new Raycaster();

    this.initSkybox();
    this.initParticles();
  }

  initSkybox() {
    const skyGeo = new SphereGeometry(100, 60, 60);
    const skyMaterial = new MeshPhongMaterial({
      color: 0x000000,
      side: BackSide
    });
    this.sky = new Mesh(skyGeo, skyMaterial);
  }

  initParticles() {
    // Particles
    this.particleCount = 1000;
    const particlesSize = Math.random() * (1 - 0.5) + 0.5;

    this.particlesGeom = new Geometry();
    const particlesMaterial = new PointsMaterial({
      color: 0xFFFFFF,
      size: particlesSize,
      blending: AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    for (var p = 0; p < this.particleCount; p++) {
      var pX = Math.random() * 100;
      var pY = Math.random() * 10;
      var pZ = Math.random() * 60;
      var particle = new Vector3(pX, pY, pZ);
      this.particlesGeom.vertices.push(particle);
    }

    this.particles = new Points(this.particlesGeom, particlesMaterial);
    this.particles.sortParticles = true;
    this.particles.position.set(-5, -5, -30);
    this.particles.scale.z = 5;

    this.scene.add(this.particles);
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

  mount() {
    this.solved = false;
    this.level = this.controller.getState(`app.level`);
    this.collision = null;
    this.tiles = [];
    this.world = null;

    console.log(`Level ${this.level}`);

    // Mount perso if not exist
    if (_.isNil(this.perso)) {
      this.perso = new BlendCharacter(this.app.assetsManager.getAsset(`perso`));
      this.userPosition.add(this.perso);
      this.perso.scale.set(0.015, 0.015, 0.015);
      this.perso.setMaterial(this.persoMaterial);
      this.perso.play(`idle`, 1);
    }
    this.userPosition.position.set(0, 0, 0);

    // Particle Texture
    if (_.isNil(this.particles.material.map)) {
      this.particles.material.map = this.app.assetsManager.getAsset(`particleTexture`);
    }

    // Mousemove
    document.addEventListener(`mousemove`, this.onMouseMove, false);

    if (this.level === 1) {
      this.mountEmotion1();
    } else if (this.level === 2) {
      this.mountEmotion2();
    } else if (this.level === 3) {
      this.mountEmotion3();
    }

    console.log(this.tiles);

    this.scene.add(this.world);
    this.world.updateMatrixWorld();
    if (this.level === 1) { // TODO: remove when collision on 2 & 3 are OK
      this.collision.material.visible = false;
    }

  }

  mountEmotion1() {
    this.world = this.app.assetsManager.getAsset(`world1`);
    this.world.traverseVisible((item) => {
      console.log(item.name);
      if (item.name === `collision`) {
        this.collision = item;
      }
      if (item.name === `zone-action`) {
        this.tiles.push(item);
      }
    });
  }

  mountEmotion2() {
    this.world = this.app.assetsManager.getAsset(`world2`);
    this.world.traverseVisible((item) => {
      console.log(item.name);
      if (item.name === `collision`) {
        this.collision = item;
      }
      if (item.name === `zone`) {
        this.tiles.push(item);
      }
    });
  }

  mountEmotion3() {
    this.world = this.app.assetsManager.getAsset(`world3`);
    this.world.traverseVisible((item) => {
      console.log(item.name);
      if (item.name === `collision`) {
        this.collision = item;
      }
      if (item.name === `zone`) {
        this.tiles.push(item);
      }
    });
  }

  update(time, dt) {

    this.updatePerso(time, dt);

    this.collisionTileResults = this.raycaster.intersectObjects(this.tiles);
    if (this.collisionTileResults.length && this.solved === false) {
      this.controller.getSignal(`app.setNextStep`)();
      this.solved = true;
    }

    this.updateCameraman();

    this.updateParticles(time, dt);

  }

  updatePerso(time, dt) {
    const movement = {
      forward: 0,
      left: 0
    };

    // Find movement depending on key pressed
    if ((this.userLeft && !this.userRight) || (this.userQ && !this.userD)) { movement.left = 1; }
    if ((this.userRight && !this.userLeft) || (this.userD && !this.userQ)) { movement.left = -1; }
    if ((this.userUp && !this.userDown) || (this.userZ && !this.userS)) { movement.forward = 1; }
    if ((this.userDown && !this.userUp) || (this.userS && !this.userZ)) { movement.forward = -1; }

    const isMoving = (movement.forward !== 0 || movement.left !== 0);

    const angle = motion.calc.degreesToRadians(motion.calc.angle(
      { y: movement.forward, x: 0 },
      { y: 0, x: -movement.left}
    ));

    // Update Velocity
    if (isMoving) {
      this.persoVelocityLinear += 0.0001;
    } else if (this.persoVelocityLinear > 0) {
      this.persoVelocityLinear -= 0.005;
    }
    this.persoVelocityLinear = motion.calc.restrict(this.persoVelocityLinear, 0, 0.1);

    this.persoVelocity = (Math.pow(((this.persoVelocityLinear-0.1)*10), 3) / 10) + 0.1;

    const dist = this.persoVelocity * dt;

    const move = motion.calc.pointFromAngleAndDistance(
      { x: 0, y: 0 },
      motion.calc.radiansToDegrees(angle),
      dist
    );

    // Is there a ground ahead ?
    const canMove = motion.calc.pointFromAngleAndDistance(
      { x: 0, y: 0 },
      motion.calc.radiansToDegrees(angle),
      dist
    );
    this.userPosition.translateZ(-canMove.x);
    this.userPosition.translateX(-canMove.y);
    this.raycaster.set(this.userPosition.position, new Vector3(0, -1, 0));
    this.userPosition.translateZ(+canMove.x);
    this.userPosition.translateX(+canMove.y);
    this.raycaster.ray.origin.y += 2;

    const canMoveCollision = this.raycaster.intersectObjects([this.collision]);
    if (canMoveCollision.length) {
      // console.log(`ok can move`)
      this.userPosition.translateZ(-move.x);
      this.userPosition.translateX(-move.y);
    } else {
      // console.log(`nope, can't move`);
      this.persoVelocityLinear = 0;
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

    this.collisionGroundResults = this.raycaster.intersectObjects([this.collision]);
    if (this.collisionGroundResults.length) {
      this.userPosition.position.y = this.collisionGroundResults[0].point.y;
    } else {
      console.log(`No ground collision`);
    }
  }

  updateCameraman() {
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
  }

  updateParticles(time, dt) {
    // if(this.level == 3){
    //   console.log(`COUCOU`);
    // }
    this.particles.rotation.y -= 0.0001;
    // this.particles.rotation.y -= 0.02;


    this.particles.geometry.verticesNeedUpdate = true;
  }

  unmount() {
    document.removeEventListener(`mousemove`, this.onMouseMove, false);
    this.scene.remove(this.world);
  }

  onMouseMove(e) {
    var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    this.cameramanRotation.hori -= movementX * 0.0005;
    this.cameramanRotation.vert -= movementY * 0.003;

    this.cameramanRotation.hori %= 1;
    this.cameramanRotation.vert = motion.calc.restrict(this.cameramanRotation.vert, 0, 1);
  }

}
