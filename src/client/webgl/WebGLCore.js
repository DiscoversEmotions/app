import { EffectComposer, RenderPass, GlitchPass, SMAAPass } from 'postprocessing';
import * as motion from 'popmotion';
import _ from 'lodash';
import { Vector3, Color } from 'three';
import { Worlds } from '~/types';
import { ConnectFunction, ConnectMethod } from '~/core';
import { Scene } from './Scene';
import { Renderer } from './Renderer';

import { RoomWorld } from './RoomWorld';
import { MindWorld } from './MindWorld';
import { MemoryWorld } from './MemoryWorld';
import { BlackWorld } from './BlackWorld';

// interface World {
//   constructor(store)
//   getScene()
//   getCameraman()
//   update()
// }


function noop (yolo) {
  return yolo;
}

export class WebGLCore {

  constructor(app, parentElement, controller) {
    this.app = app;
    this.parentElement = parentElement;

    this.controller = controller;

    this.defaultEnvConfig = {
      background: new Color(0, 0, 0)
    };

    this.world = null;
    this.nextWorld = null;

    this.scene = new Scene();
    this.renderer = new Renderer();
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.renderPass.renderToScreen = true;
    this.composer.addPass(this.renderPass);

    this.worlds = {
      [Worlds.Room]: new RoomWorld(this.app, this.controller, this.parentElement),
      [Worlds.Mind]: new MindWorld(this.app, this.controller, this.parentElement),
      [Worlds.Memory]: new MemoryWorld(this.app, this.controller, this.parentElement),
      [Worlds.Black]: new BlackWorld(this.app, this.controller, this.parentElement)
    };

    // Append to DOM
    this.parentElement.appendChild( this.renderer.domElement );

    // this._mountWorld(this.currentWorld, 0);

    this._initComposer();
    this._resize({}, this.controller, this);
    this._updateWorld({}, this.controller, this);
    // this._resize();
  }

  update(time, dt) {
    this._updatePass();
    if (this.world) {
      this.worlds[this.world].update(time, dt);
    }
  }

  render(time, dt) {
    if (this.world === null) {
      return;
    }
    var cameraman = this.worlds[this.world].getCameraman();
    this.renderPass.camera = cameraman.getCamera();
    this.composer.render(dt);
  }

  @ConnectMethod(
    { size: `app.size` }
  )
  _resize(props) {
    console.log(`_resize`);
    console.log(props);
    this.width = props.size.width;
    this.height = props.size.height;
    _.forEach(this.worlds, (world) => {
      if (_.isFunction(world.setSize)) {
        world.setSize(this.width, this.height);
      }
    });
    this.composer.setSize(this.width, this.height);
    this.renderer.setSize(this.width, this.height);
  }

  @ConnectMethod(
    {
      world: `app.world`,
      nextWorld: `app.nextWorld`
    }
  )
  _updateWorld({ world, nextWorld }) {
    if (this.world === null) {
      this._mountWorld(world);
    }
    this.world = world;
    this.nextWorld = nextWorld;
    // const nextWorld = this.store.computedState.get(`world`);
    // if (nextWorld !== this.currentWorld) {
    //   if (this.currentWorld === null) {
    //     this._mountWorld(nextWorld, time);
    //   } else {
    //     this._switchWorld(nextWorld, time);
    //   }
    // }
    // // Update worlds
    // this.worlds[this.currentWorld].update(time, dt);
  }

  _updatePass() {
    // if (
    //   this.store.computedState.get(`glitch`)
    // ) {
    //   this.glitchPass.enabled = true;
    //   this.renderPass.renderToScreen = false;
    // } else {
    //   this.renderPass.renderToScreen = true;
    //   this.glitchPass.enabled = false;
    //   this.store.actions.world.endTransition();
    // }
  }

  _initComposer() {
    this.glitchPass = new GlitchPass();
    this.glitchPass.renderToScreen = true;
    this.glitchPass.mode = 1;
    this.glitchPass.enabled = false;
    this.composer.addPass(this.glitchPass);
  }

  _mountWorld(worldName, time) {
    console.log(`_mountWorld`);
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
