import * as motion from 'popmotion';
import _ from 'lodash';
import { Vector3 } from 'three';
import { Scene } from './Scene';
import { Renderer } from './Renderer';
import { Cameraman } from './Cameraman';
import * as actions from '~/actions';

import { RoomWorld } from './RoomWorld';
import { MindWorld } from './MindWorld';
import { MemoryWorld } from './MemoryWorld';
// interface World {
//   constructor(stateManager)
//   getScene()
//   getRootObject()
//   getCameraman()
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

    this.transitionCameraman = new Cameraman(45, 1, 1, 1100);
    this.transitionPrevWorld = null;
    this.transitionProgress = null;

    this.worlds = {
      room: new RoomWorld(this.stateManager),
      mind: new MindWorld(this.stateManager),
      memory: new MemoryWorld(this.stateManager)
    };

    this.scene.add(this.transitionCameraman);

    /////////
    this.scene.add(this.worlds[this.currentWorld].getRootObject());
    /////////

    this._resize();
    // Append to DOM
    this.parentElement.appendChild( this.renderer.domElement );
  }

  update(time, dt) {
    const transitionInProgress = this.stateManager.state.getIn([`world`, `transitionInProgress`]);
    if (this.stateManager.state !== this.lastState) {
      this._onStateChange(time, dt);
      this.lastState = this.stateManager.state;
    }
    // Update worlds
    this.worlds[this.currentWorld].update(time, dt);
    if (transitionInProgress) {
      this.worlds[this.transitionPrevWorld].update(time, dt);
    }
    // Update worlds position
    if (transitionInProgress) {
      const fromCam = this.worlds[this.transitionPrevWorld].getCameraman();
      const toCam = this.worlds[this.currentWorld].getCameraman();
      this.transitionCameramanPosFrom = fromCam.localToWorld(new Vector3(0, 0, 0));
      this.transitionCameramanPosTo = toCam.localToWorld(new Vector3(0, 0, 0));
      this.transitionCameramanRotFrom = {
        vert: Math.asin(Math.sin(fromCam.getVerticalAngle())),
        hori: Math.asin(Math.sin(fromCam.getHorizontalAngle()))
      };
      this.transitionCameramanRotTo = {
        vert: Math.asin(Math.sin(toCam.getVerticalAngle())),
        hori: Math.asin(Math.sin(toCam.getHorizontalAngle()))
      };
      this.transitionCameraman.position.set(
        motion.calc.dilate(this.transitionCameramanPosFrom.x, this.transitionCameramanPosTo.x, this.transitionProgress),
        motion.calc.dilate(this.transitionCameramanPosFrom.y, this.transitionCameramanPosTo.y, this.transitionProgress),
        motion.calc.dilate(this.transitionCameramanPosFrom.z, this.transitionCameramanPosTo.z, this.transitionProgress)
      );
      console.log(motion.calc.dilate(this.transitionCameramanRotFrom.hori, this.transitionCameramanRotTo.hori, this.transitionProgress));
      this.transitionCameraman.setHorizontalAngle(
        motion.calc.dilate(this.transitionCameramanRotFrom.hori, this.transitionCameramanRotTo.hori, this.transitionProgress)
      );
      this.transitionCameraman.setVerticalAngle(
        motion.calc.dilate(this.transitionCameramanRotFrom.vert, this.transitionCameramanRotTo.vert, this.transitionProgress)
      );
    }
  }

  render() {
    const transitionInProgress = this.stateManager.state.getIn([`world`, `transitionInProgress`]);
    var cameraman = this.worlds[this.currentWorld].getCameraman();
    if (transitionInProgress) {
      cameraman = this.transitionCameraman;
    }
    this.renderer.render(this.scene, cameraman.getCamera());
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

  _startWorldTransition(fromWorld, toWorld) {
    console.log(`World transition ${fromWorld} -> ${toWorld}`);
    // keep prevWorld
    this.transitionPrevWorld = fromWorld;
    this.stateManager.updateState(actions.world.startTransition());
    // Add new world
    const nextWordlRootObject = this.worlds[toWorld].getRootObject();
    this.scene.add(nextWordlRootObject);
    this.worlds[fromWorld].getRootObject().position.z = 100;
    this.worlds[toWorld].getRootObject().position.z = 0;
    this.worlds[fromWorld].getRootObject().updateMatrixWorld(true);
    this.worlds[toWorld].getRootObject().updateMatrixWorld(true);
    // Sync transition cam
    const fromCam = this.worlds[fromWorld].getCameraman();
    const toCam = this.worlds[toWorld].getCameraman();
    this.transitionCameramanPosFrom = fromCam.localToWorld(new Vector3(0, 0, 0));
    this.transitionCameramanPosTo = toCam.localToWorld(new Vector3(0, 0, 0));
    this.transitionCameramanRotFrom = {
      vert: fromCam.getVerticalAngle(),
      hori: fromCam.getHorizontalAngle()
    };
    this.transitionCameramanRotTo = {
      vert: toCam.getVerticalAngle(),
      hori: toCam.getHorizontalAngle()
    };

    motion.tween({
      values: {
        transitionProgress: {
          from: 0,
          to: 1,
          duration: 4000
        }
      },
      onComplete: () => {
        this.stateManager.updateState(actions.world.endTransition());
        this.scene.remove(this.worlds[this.transitionPrevWorld].getRootObject())
      }
    }).on(this).start();

    // motion.physics({
    //   values: {
    //     transitionProgress: {
    //       current: 0,
    //       to: 100,
    //       velocity: 10,
    //       spring: 200,
    //       friction: 0.8
    //     }
    //   }
    // }).on(this).start();
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
      this.transitionCameraman.setSize(this.width, this.height);
    }
  }

}
