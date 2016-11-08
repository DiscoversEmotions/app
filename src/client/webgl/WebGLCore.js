import { Scene } from './Scene';
import { Renderer } from './Renderer';
import { Camera } from './Camera';
import _ from 'lodash';

import { RoomWorld } from './RoomWorld';
import { MindWorld } from './MindWorld';
import { MemoryWorld } from './MemoryWorld';
// interface World {
//   constructor(stateManager)
//   getScene()
//   getCamera()
//   update()
// }


export class WebGLCore {

  constructor(parentElement, stateManager) {
    this.parentElement = parentElement;

    this.width = null;
    this.height = null;
    this.lastState = null;
    this.stateManager = stateManager;

    this.scene = new Scene();
    this.renderer = new Renderer();
    this.transitionCamera = new Camera(75, 1, 1, 1100);

    this.worlds = {
      room: new RoomWorld(this.stateManager),
      mind: new MindWorld(this.stateManager),
      memory: new MemoryWorld(this.stateManager)
    };

    this.scene.add(this.transitionCamera);

    /////////
    const currentWorld = this.stateManager.state.getIn([`world`, `current`]);
    this.scene.add(this.worlds[currentWorld].getScene());
    /////////

    this._resize();
    // Append to DOM
    this.parentElement.appendChild( this.renderer.domElement );
  }

  update(time, dt) {
    if (this.stateManager.state !== this.lastState) {
      this._onStateChange(time, dt);
      this.lastState = this.stateManager.state;
    }
    const currentWorld = this.stateManager.state.getIn([`world`, `current`]);
    this.worlds[currentWorld].update(time, dt);
  }

  render() {
    const currentWorld = this.stateManager.state.getIn([`world`, `current`]);
    this.renderer.render(this.scene, this.worlds[currentWorld].getCamera());
  }

  _onStateChange(time, dt) {
    this._resize();
  }

  _resize() {
    const state = this.stateManager.state;
    if (this.width !== state.get(`width`) || this.height !== state.get(`height`)) {
      this.width = state.get(`width`);
      this.height = state.get(`height`);
      _.forEach(this.worlds, (world) => {
        if (_.isFunction(world.setSize)) {
          world.setSize(this.width, this.height);
        }
      });
      this.renderer.setSize(this.width, this.height);
      this.transitionCamera.setSize(this.width, this.height);
    }
  }

}
