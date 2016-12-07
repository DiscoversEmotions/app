import { EventUtils } from '~/core';
import { PointLight, Object3D, Mesh, MeshBasicMaterial, SphereGeometry, Color } from 'three';
import _ from 'lodash';
import { Scene } from './Scene';
import { lastMessage } from '~/computed';
import { Steps } from '~/types';
import { ConnectMethod } from '~/core';
import * as motion from 'popmotion';

export class RoomScene extends Scene {

  constructor(...args) {
    super(...args);

    this.pointerLocked = false;

    // State Update
    this.stateUpdate({}, this.controller, this);

    this.scene.add(this.cameraman);

    this.camVert = 0;
    this.mousePos = { x: 0, y: 0 };

    this.roomSphere = null;

    // Bind
    this._onMouseMove = _.throttle(this._onMouseMove.bind(this), 1000/60);
  }

  getEnvConfig() {
    return {
      fogDensity: 0,
      fogColor: new Color(0x000000)
    };
  }

  mount() {
    if (this.roomSphere === null) {
      var geom = new SphereGeometry(50, 60, 60);
      geom.scale( -1, 1, 1 );
      const roomTexture = this.app.assetsManager.getAsset(`room`);
      var material = new MeshBasicMaterial({
        map: roomTexture
      });
      this.roomSphere = new Mesh(geom, material);
      this.scene.add(this.roomSphere);
    }

    document.addEventListener(`mousemove`, this._onMouseMove, false);
  }

  unmount() {
    document.removeEventListener(`mousemove`, this._onMouseMove, false);
  }

  update(time, dt) {
    this._updateCameraman();
  }

  _onMouseMove(e) {
    if (this.pointerLocked) {
      const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
      const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
      this.mousePos.x += movementX * 0.003;
      this.mousePos.y += movementY * 0.003;
      this.mousePos.x = motion.calc.restrict(this.mousePos.x, -1, 1);
      this.mousePos.y = motion.calc.restrict(this.mousePos.y, -1, 1);
    } else {
      const offset = EventUtils.getOffsetOf(e, this.parentElement);
      this.mousePos.x = ((offset.x / this.size.width) * 2) - 1;
      this.mousePos.y = ((offset.y / this.size.height) * 2) - 1;
    }
  }

  _updateCameraman() {
    this.cameraman.setHorizontalAngle((Math.PI * 1.5) - (1 * this.mousePos.x));
    this.cameraman.setVerticalAngle(- (0.5 * this.mousePos.y));
  }

  @ConnectMethod(
    {
      pointerLocked: `app.pointerLock`
    }
  )
  stateUpdate({ pointerLocked }) {
    this.pointerLocked = pointerLocked;
  }

}
