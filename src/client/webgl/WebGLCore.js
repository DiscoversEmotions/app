import * as motion from 'popmotion';
import _ from 'lodash';
import { Vector3, Color, FogExp2 } from 'three';
import { EffectComposer, RenderPass, GlitchPass, SMAAPass } from 'postprocessing';
import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { RoomWorld, MindWorld, MemoryWorld, BlackWorld } from './worlds';
import { Scene } from './Scene';
import { Renderer } from './Renderer';

export class WebGLCore {

  constructor(app, parentElement, controller) {
    this.app = app;
    this.parentElement = parentElement;

    this.controller = controller;

    this.defaultEnvConfig = {
      background: new Color(0, 0, 0),
      fogDensity: 0
    };

    this.world = null;
    this.nextWorld = null;

    this.scene = new Scene();

    console.log(this.scene);
    this.scene.fog = new FogExp2(0xfff1ce, 0.1);

    this.renderer = new Renderer();
    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.renderPass.renderToScreen = true;
    this.composer.addPass(this.renderPass);

    this.worlds = {
      [Worlds.Room]: new RoomWorld(this, this.app, this.controller, this.parentElement),
      [Worlds.Mind]: new MindWorld(this.app, this.controller, this.parentElement),
      [Worlds.Memory]: new MemoryWorld(this.app, this.controller, this.parentElement),
      [Worlds.Black]: new BlackWorld(this.app, this.controller, this.parentElement)
    };

    // Append to DOM
    this.parentElement.appendChild( this.renderer.domElement );

    this.initComposer();
    this.resize({}, this.controller, this);
    this.updateWorld({}, this.controller, this);
    this.updatePass({}, this.controller, this);
  }

  update(time, dt) {
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
  resize(props) {
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
  updateWorld({ world, nextWorld }) {
    // Init
    if (this.world === null) {
      this.mountWorld(world);
    } else if (this.world !== world) {
      this.switchWorld(world);
    }
    this.world = world;
    this.nextWorld = nextWorld;
    // const nextWorld = this.store.computedState.get(`world`);
    // if (nextWorld !== this.currentWorld) {
    //   if (this.currentWorld === null) {
    //     this.mountWorld(nextWorld, time);
    //   } else {
    //     this.switchWorld(nextWorld, time);
    //   }
    // }
    // // Update worlds
    // this.worlds[this.currentWorld].update(time, dt);
  }

  @ConnectMethod(
    {
      world: `app.world`,
      worldTransition: `app.worldTransition`
    }
  )
  updatePass({ worldTransition, world }) {
    if (worldTransition) {
      this.glitchPass.enabled = true;
      this.renderPass.renderToScreen = false;
    } else {
      this.renderPass.renderToScreen = true;
      this.glitchPass.enabled = false;
    }
  }


  initComposer() {
    this.glitchPass = new GlitchPass();
    this.glitchPass.renderToScreen = true;
    this.glitchPass.mode = 1;
    this.glitchPass.enabled = false;
    this.composer.addPass(this.glitchPass);
  }

  mountWorld(worldName) {
    const worldScene = this.worlds[worldName].getScene();
    if (_.isFunction(this.worlds[worldName].mount)) {
      this.worlds[worldName].mount();
    }
    if (_.isFunction(this.worlds[worldName].getEnvConfig)) {
      const envConfig = Object.assign({}, this.defaultEnvConfig, this.worlds[worldName].getEnvConfig());
      this.useEnvConfig(envConfig);
    } else {
      this.useEnvConfig(this.defaultEnvConfig);
    }
    this.scene.add(worldScene);
    this.currentWorld = worldName;
  }

  unmountWorld(worldName, time) {
    const worldScene = this.worlds[worldName].getScene();
    if (_.isFunction(this.worlds[worldName].unmount)) {
      this.worlds[worldName].unmount(time);
    }
    this.scene.remove(worldScene);
  }

  switchWorld(nextWorld) {
    this.unmountWorld(this.currentWorld);
    this.mountWorld(nextWorld);
  }

  useEnvConfig(config) {
    this.scene.background = config.background;
    this.scene.fog.density = config.fogDensity;
  }

}
