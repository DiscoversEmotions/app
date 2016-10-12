import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { Scene } from './Scene';
import { PostProcessing } from './PostProcessing';
import { MainLoop } from './MainLoop';
import { Clock } from './Clock';

/**
 * WebGLCore class
 */
export class WebGLCore {

  constructor(parentElement) {
    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.postProcessing = null;
    this.mainLoop = null;

    this.parentElement = parentElement;
    this.clock = new Clock();
  }

  boot() {
    this.scene = this.initScene();
    this.camera = this.initCamera(this.parentElement);
    this.renderer = this.initRenderer();
    this.postProcessing = this.initPostProcessing(this.renderer);

    // Add to the dom
    this.parentElement.appendChild(this.renderer.domElement);

    this.mainLoop = new MainLoop(this.render.bind(this), 1/60);

    // start clock
    this.clock.start();
    // start loop
    this.mainLoop.start();
  }

  initRenderer () {
    var canvas = document.createElement('canvas');
    var gl;
    try {
      gl = canvas.getContext('webgl2');
    } catch (err) {
      console.error(err);
    }
    var isWebGL2 = Boolean(gl);
    console.log('isWebGL2 : ' + isWebGL2);

    return new Renderer({
      canvas: canvas,
      context: gl
    });
  }

  initCamera (parentElement) {
    return new Camera(parentElement, 75, window.innerWidth / window.innerHeight, 0.1, 10000);
  }

  initScene () {
    return new Scene();
  }

  initPostProcessing (renderer) {
    return new Renderer(renderer);
  }

  render () {
    var dt = this.clock.getDelta();
    var time = this.clock.getElapsedTime();
    this.update(time, dt);
    this.postProcessing.render(this.scene, this.camera);
  }

  update (time, dt) {
    this.scene.update(time, dt);
    this.camera.update(time, dt);
    this.postProcessing.update(time, dt);
  }

}
