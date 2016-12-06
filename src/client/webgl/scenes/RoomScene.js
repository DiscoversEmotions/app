import { EventUtils } from '~/core';
import { PointLight, Object3D, Mesh, MeshBasicMaterial, SphereGeometry, Color } from 'three';
import _ from 'lodash';
import { Scene } from './Scene';
import { lastMessage } from '~/computed';
import { Steps } from '~/types';

export class RoomScene extends Scene {

  constructor(...args) {
    super(...args);

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
    const offset = EventUtils.getOffsetOf(e, this.parentElement);
    this.mousePos.x = ((offset.x / this.size.width) * 2) - 1;
    this.mousePos.y = ((offset.y / this.size.height) * 2) - 1;
  }

  _updateCameraman() {
    this.cameraman.setHorizontalAngle((Math.PI * 1.5) - (1 * this.mousePos.x));
    this.cameraman.setVerticalAngle(- (0.5 * this.mousePos.y));
  }

}
