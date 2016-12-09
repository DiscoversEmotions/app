import * as motion from 'popmotion';
import _ from 'lodash';
import { Color, FogExp2, Scene } from 'three';
import { EffectComposer, RenderPass, GlitchPass, BloomPass } from 'postprocessing';
import { ConnectFunction, ConnectMethod } from '~/core';
import { Scenes } from '~/types';
import { RoomScene, EmotionScene, MemoryScene, BootScene } from './scenes';
import { Renderer } from './Renderer';
import { CopyPass } from './utils';
import { BrightnessPass } from './pass/BrighnessPass';

export class WebGLCore {

  constructor(app, parentElement, controller) {
    this.app = app;
    this.parentElement = parentElement;
    this.controller = controller;

    this.defaultEnvConfig = {
      background: new Color(0, 0, 0),
      fogDensity: 0,
      fogColor: new Color(0, 0, 0)
    };

    this.currentSceneName = null;
    this.nextSceneName = null;

    this.coreScene = new Scene();

    this.coreScene.fog = new FogExp2(0xfff1ce, 0.1);

    this.renderer = new Renderer();
    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(this.coreScene, this.camera);
    this.renderPass.renderToScreen = false;

    this.composer.addPass(this.renderPass);

    this.scenesList = _.mapValues({
      [Scenes.Room]: RoomScene,
      [Scenes.Emotion]: EmotionScene,
      [Scenes.Memory]: MemoryScene,
      [Scenes.Boot]: BootScene
    }, (value, key) => {
      return new value(key, this, this.app, this.controller, this.parentElement);
    });

    // Append to DOM
    this.parentElement.appendChild( this.renderer.domElement );

    this.initComposer();

    this.resize({}, this.controller, this);
    this.updateScene({}, this.controller, this);
    this.updatePass({}, this.controller, this);

  }

  update(time, dt) {
    if (this.currentSceneName) {
      this.scenesList[this.currentSceneName].update(time, dt);
    }
  }

  render(time, dt) {
    if (this.currentSceneName === null) {
      return;
    }
    var cameraman = this.scenesList[this.currentSceneName].getCameraman();
    this.renderPass.camera = cameraman.getCamera();
    this.composer.render(dt);
  }

  @ConnectMethod(
    { size: `app.size` }
  )
  resize(props) {
    this.width = props.size.width;
    this.height = props.size.height;
    _.forEach(this.scenesList, (scene) => {
      if (_.isFunction(scene.setSize)) {
        scene.setSize(this.width, this.height);
      }
    });
    this.composer.setSize(this.width, this.height);
    this.renderer.setSize(this.width, this.height);
  }

  @ConnectMethod(
    {
      currentSceneName: `app.scene.current`,
      nextSceneName: `app.scene.next`
    }
  )
  updateScene({ currentSceneName, nextSceneName }) {
    // Init
    if (this.currentSceneName === null) {
      this.mountScene(currentSceneName);
    } else if (this.currentSceneName !== currentSceneName) {
      this.switchScene(currentSceneName);
    }
    this.currentSceneName = currentSceneName;
    this.nextSceneName = nextSceneName;
  }

  @ConnectMethod(
    {
      sceneTransition: `app.scene.transition`,
      scene: `app.scene.current`
    }
  )
  updatePass({ sceneTransition, scene }) {
    this.glitchPass.enabled = sceneTransition;
    if (scene === Scenes.Emotion || scene === Scenes.Memory) {
      this.bloomPass.enabled = true;
      this.brightnessPass.enabled = true;
    } else {
      this.bloomPass.enabled = false;
      this.brightnessPass.enabled = false;
    }
  }


  initComposer() {

    this.glitchPass = new GlitchPass();
    this.glitchPass.mode = 1;
    this.glitchPass.enabled = false;
    this.composer.addPass(this.glitchPass);

    this.bloomPass = new BloomPass();
    this.bloomPass.enabled = false;
    this.composer.addPass(this.bloomPass);

    this.brightnessPass = new BrightnessPass();
    this.brightnessPass.enabled = true;
    this.composer.addPass(this.brightnessPass);

    this.toScreenPass = new CopyPass();
    this.toScreenPass.renderToScreen = true;
    this.composer.addPass(this.toScreenPass);
  }

  mountScene(sceneName) {
    const scene = this.scenesList[sceneName].getScene();
    if (_.isFunction(this.scenesList[sceneName].mount)) {
      this.scenesList[sceneName].mount();
    }
    if (_.isFunction(this.scenesList[sceneName].getEnvConfig)) {
      this.useEnvConfig(this.scenesList[sceneName].getEnvConfig());
    } else {
      this.useEnvConfig(this.defaultEnvConfig);
    }
    this.coreScene.add(scene);
    this.currentSceneName = sceneName;
  }

  unmountScene(sceneName, time) {
    const scene = this.scenesList[sceneName].getScene();
    if (_.isFunction(this.scenesList[sceneName].unmount)) {
      this.scenesList[sceneName].unmount(time);
    }
    this.coreScene.remove(scene);
  }

  switchScene(nextSceneName) {
    this.unmountScene(this.currentSceneName);
    this.mountScene(nextSceneName);
  }

  useEnvConfig(config) {
    const envConfig = Object.assign({}, this.defaultEnvConfig, config);
    this.coreScene.background = envConfig.background;
    this.coreScene.fog.density = envConfig.fogDensity;
    this.coreScene.fog.color = envConfig.fogColor;
  }

}
