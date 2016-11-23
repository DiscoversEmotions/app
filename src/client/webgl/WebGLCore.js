import { EffectComposer, RenderPass, GlitchPass, SMAAPass } from 'postprocessing';
import * as motion from 'popmotion';
import _ from 'lodash';
import { Vector3, Color } from 'three';
import { Worlds } from '~/types';
import { ConnectFunction } from '~/core';
import { Scene } from './Scene';
import { Renderer } from './Renderer';

import { RoomWorld } from './RoomWorld';
import { MindWorld } from './MindWorld';
import { MemoryWorld } from './MemoryWorld';

// interface World {
//   constructor(store)
//   getScene()
//   getCameraman()
//   update()
// }

export class WebGLCore {

  constructor(parentElement, controller) {
    this.parentElement = parentElement;

    this.controller = controller;

    this.defaultEnvConfig = {
      background: new Color(0, 0, 0)
    };

    this.sizeWatcher = ConnectFunction(
      this.controller,
      {
        size: `app.size`
      }
    )((props) => {
      console.log(`size changed !`);
    });

    this.scene = new Scene();
    this.renderer = new Renderer();
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.renderPass.renderToScreen = true;
    this.composer.addPass(this.renderPass);

    this.worlds = {
      [Worlds.Room]: new RoomWorld(Worlds.Room, this.store, this.parentElement),
      [Worlds.Mind]: new MindWorld(Worlds.Mind, this.store, this.parentElement),
      [Worlds.Memory]: new MemoryWorld(Worlds.Memory, this.store, this.parentElement)
    };

    // this._mountWorld(this.currentWorld, 0);

    this._initComposer();

    // this._resize();
    // Append to DOM
    this.parentElement.appendChild( this.renderer.domElement );
  }

  update(time, dt) {
    this._resize();
    this._updateWorld(time, dt);
    this._updatePass();
  }

  render(time, dt) {
    // var cameraman = this.worlds[this.currentWorld].getCameraman();
    // this.renderPass.camera = cameraman.getCamera();
    // this.composer.render(dt);
  }

  _resize() {
    const size = this.store.state.get(`size`).toJS();
    if (this.width !== size.width || this.height !== size.height) {
      this.width = size.width;
      this.height = size.height;
      _.forEach(this.worlds, (world) => {
        if (_.isFunction(world.setSize)) {
          world.setSize(this.width, this.height);
        }
      });
      this.composer.setSize(this.width, this.height);
      this.renderer.setSize(this.width, this.height);
    }
  }

  _updateWorld(time, dt) {
    const nextWorld = this.store.computedState.get(`world`);
    if (nextWorld !== this.currentWorld) {
      if (this.currentWorld === null) {
        this._mountWorld(nextWorld, time);
      } else {
        this._switchWorld(nextWorld, time);
      }
    }
    // Update worlds
    this.worlds[this.currentWorld].update(time, dt);
  }

  _updatePass() {
    if (
      this.store.computedState.get(`glitch`)
    ) {
      this.glitchPass.enabled = true;
      this.renderPass.renderToScreen = false;
    } else {
      this.renderPass.renderToScreen = true;
      this.glitchPass.enabled = false;
      this.store.actions.world.endTransition();
    }
  }

  _initComposer() {
    this.glitchPass = new GlitchPass();
    this.glitchPass.renderToScreen = true;
    this.glitchPass.mode = 1;
    this.glitchPass.enabled = false;
    this.composer.addPass(this.glitchPass);
  }

  _mountWorld(worldName, time) {
    const worldScene = this.worlds[worldName].getScene();
    if (_.isFunction(this.worlds[worldName].mount)) {
      this.worlds[worldName].mount(time);
    }
    if (_.isFunction(this.worlds[worldName].getEnvConfig)) {
      const envConfig = Object.assign({}, this.defaultEnvConfig, this.worlds[worldName].getEnvConfig());
      this._useEnvConfig(envConfig);
    } else {
      this._useEnvConfig(this.defaultEnvConfig);
    }
    this.scene.add(worldScene);
    this.currentWorld = worldName;
  }

  _unmountWorld(worldName, time) {
    const worldScene = this.worlds[worldName].getScene();
    if (_.isFunction(this.worlds[worldName].unmount)) {
      this.worlds[worldName].unmount(time);
    }
    this.scene.remove(worldScene);
  }

  _switchWorld(nextWorld, time) {
    this._unmountWorld(this.currentWorld);
    this._mountWorld(nextWorld);
    this.store.actions.world.startTransition();
  }

  _useEnvConfig(config) {
    this.scene.background = config.background;
  }

}
