import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { Scene } from './Scene';
import { MainLoop } from './MainLoop';

/**
 * WebGLCore class
 */
export class WebGLCore {

  constructor(parentElement) {
    this.renderer = null;
    this.parentElement = null;
    this.camera = null;
    this.scene = null;
    this.mainLoop = null;
    this.parentElement = parentElement;
  }

  boot() {
    this.scene = this.initScene();
    this.camera = this.initCamera(this.parentElement);
    this.renderer = this.initRenderer();

    // Add to the dom
    this.parentElement.appendChild(this.renderer.domElement);
    this.scene = this.initScene(this.renderer, this.camera);

    this.mainLoop = new MainLoop(this.render.bind(this), 1/60);

    // start loop
    this.mainLoop.start();
  }

  initRenderer () {
    return new Renderer();
  }

  initCamera (parentElement) {
    return new Camera(parentElement, 75, window.innerWidth / window.innerHeight, 0.1, 10000);
  }

  initScene () {
    return new Scene();
  }

  render (dt) {
    this.update(dt);
    this.renderer.render(this.scene, this.camera);
  }

  update (dt) {
    this.scene.update(dt);
    this.camera.update(dt);
  }

}
