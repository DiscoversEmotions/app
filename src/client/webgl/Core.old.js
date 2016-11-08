import {
  Mesh, Scene as ThreeScene, PlaneBufferGeometry, OrthographicCamera, MeshBasicMaterial, LoadingManager
} from 'three';
import { Renderer, Scene, Camera } from '.';
import { Clock, MainLoop, WindowResizeSingleton } from '~/core/utils';
import { EffectComposer, RenderPass, GlitchPass } from 'postprocessing';
import raf from 'raf';

/**
 * Core class
 */
export class Core {

  constructor(parentElement) {

    this.width = 600;
    this.height = 600;
    this.parentElement = parentElement;
    this.scene = this.initScene();
    this.camera = this.initCamera(this.parentElement);
    this.renderer = this.initRenderer();
    this.composer = this.initPostComposer();
    this.assetsManager = this.initAssetsManager();
    this.clock = new Clock();
    this.mainLoop = new MainLoop(this.render.bind(this));
    // Add to the dom
    this.parentElement.appendChild(this.renderer.domElement);
    this.setSize(600, 600);
    // start clock
    this.clock.start();
    // start loop
    this.mainLoop.start();

    WindowResizeSingleton.getInstance().add(this.resize.bind(this));
    this.resize();
  }

  boot() {

  }

  initScene() {
    return new Scene();
  }

  initRenderer () {
    var canvas = document.createElement(`canvas`);
    var gl;
    try {
      gl = canvas.getContext(`webgl2`);
    } catch (err) {
      console.error(err);
    }
    var isWebGL2 = Boolean(gl);
    console.log(`isWebGL2 : ${isWebGL2}`);

    return new Renderer({
      canvas: canvas,
      context: gl
    });
  }

  initCamera (parentElement) {
    return new Camera(parentElement, 75, this.width / this.height, 0.1, 100);
  }

  initPostComposer () {
    const composer = new EffectComposer(this.renderer);
    composer.addPass(
      new RenderPass(this.scene, this.camera)
    );
    const glitchPass = new GlitchPass();
    glitchPass.renderToScreen = true;
    composer.addPass(glitchPass);
    return composer;
  }

  initAssetsManager() {
    return new LoadingManager();
  }

  render () {
    var dt = this.clock.getDelta();
    var time = this.clock.getElapsedTime();
    this.update(time, dt);
    this.composer.render(dt);
  }

  update (time, dt) {
    this.state.update(time, dt);
    this.scene.update(time, dt);
    this.camera.update(time, dt);
  }

  updateState(state) {

  }

  setSize (width, height) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.camera.setSize(width, height);
    this.composer.setSize(width, height);
  }

  resize () {
    this.setSize(this.parentElement.offsetWidth, this.parentElement.offsetHeight);
  }

}
