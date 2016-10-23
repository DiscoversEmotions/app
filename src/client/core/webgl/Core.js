import {
  Mesh, Scene as ThreeScene, PlaneBufferGeometry, OrthographicCamera, MeshBasicMaterial
} from 'three';
import { Renderer, Scene, Camera } from '.';
import { Clock, MainLoop, WindowResizeSingleton } from '~/core/utils';
import { Pipeline } from '~/core/pipeline';
import { QuadRenderer } from '~/core/webgl/postpro';
import { RenderPipe } from '~/core/webgl/pipes/RenderPipe';
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
    this.pipeline = this.initRenderPipeline();
    this.clock = new Clock();
    // Screen
    this.screen = new QuadRenderer(this.renderer);
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
    console.log(this.width, this.height);
    return new Camera(parentElement, 75, this.width / this.height, 0.1, 100);
  }

  initScene () {
    return new Scene();
  }

  initRenderPipeline () {
    return new Pipeline([`renderer`, `scene`, `camera`], [`screen`])
    .mapInputs({
      renderer: `renderer`,
      scene: `scene`,
      camera: `camera`
    })
    .addPipe({
      name: `render`,
      mapInputs: {
        renderer: `inputs.renderer`,
        camera: `inputs.camera`,
        scene: `inputs.scene`
      },
      pipe: new RenderPipe(),
      mapOutputs: {
        color: `color`,
        depth: `depth`
      }
    })
    .mapOutputs({
      screen: `render.color`
    });
  }

  render () {
    var dt = this.clock.getDelta();
    var time = this.clock.getElapsedTime();
    this.update(time, dt);
    const outputs = this.pipeline.render({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera
    });
    this.toScreen(outputs.screen);
  }

  update (time, dt) {
    this.scene.update(time, dt);
    this.camera.update(time, dt);
  }

  setSize (width, height) {
    this.width = width;
    this.height = height;
    this.screen.setSize(width, height);
    this.renderer.setSize(width, height);
    this.camera.setSize(width, height);
    this.pipeline.getAllPipes().forEach(pipe => {
      pipe.setSize(width, height);
    });
  }

  resize () {
    this.setSize(this.parentElement.offsetWidth, this.parentElement.offsetHeight);
  }

  toScreen (out) {
    this.screen.material.setUniform(`uInput`, out);
    this.screen.material.updateUniform(`resolution`, (val) => val.set(this.width, this.height));
    this.screen.render(this.renderer);
  }

}
