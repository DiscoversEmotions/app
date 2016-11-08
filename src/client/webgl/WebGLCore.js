import { Scene } from './Scene';
import { Renderer } from './Renderer';
import { Camera } from './Camera';
import * as actions from '~/actions';
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
    this.currentWorld = this.stateManager.state.getIn([`world`, `current`]);

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
    this.scene.add(this.worlds[this.currentWorld].getScene());
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
    this.worlds[this.currentWorld].update(time, dt);
  }

  render() {
    this.renderer.render(this.scene, this.worlds[this.currentWorld].getCamera());
  }

  _onStateChange(time, dt) {
    console.log(this.stateManager.state.toJS());
    this._resize();
    const currentWorld = this.stateManager.state.getIn([`world`, `current`]);
    if (currentWorld !== this.currentWorld) {
      this._startWorldTransition(this.currentWorld, currentWorld);
      this.currentWorld = currentWorld;
    }
  }

  _startWorldTransition(fromWordl, toWorld) {
    this.stateManager.updateState(actions.world.startTransition());
    console.log(`World transition ${fromWordl} -> ${toWorld}`);
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
