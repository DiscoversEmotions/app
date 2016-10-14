import {
  Mesh, Scene as ThreeScene, PlaneBufferGeometry, OrthographicCamera, MeshBasicMaterial
} from 'three';
import { Renderer, Scene, Camera } from '.';
import { Clock, MainLoop } from '~/core/utils';
import { Pipe } from '~/core/pipeline';
import { PostProcessingPipeline, QuadRenderer } from '~/core/webgl/postpro';
import { RenderPass } from '~/core/webgl/postpro/passes/RenderPass';
import raf from 'raf';

/**
 * Core class
 */
export class Core {

  constructor(parentElement) {
    this.width = null;
    this.height = null;
    this.parentElement = parentElement;
    this.scene = this.initScene();
    this.camera = this.initCamera(this.parentElement);
    this.renderer = this.initRenderer();
    this.pipeline = this.initRenderPipeline(this.renderer, this.scene, this.camera);
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

    raf(() => {
      this.setSize(this.parentElement.offsetWidth, this.parentElement.offsetHeight);
    });

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
    return new Camera(parentElement, 75, window.innerWidth / window.innerHeight, 0.1, 100);
  }

  initScene () {
    return new Scene();
  }

  initRenderPipeline (renderer, scene, camera) {
    return new PostProcessingPipeline({
      renderer,
      scene,
      camera
    })
    .addPipe(new Pipe({
      name: `render`,
      pass: new RenderPass(),
      inputsBinding: {
        renderer: `inputs.renderer`,
        scene: `inputs.scene`,
        camera: `inputs.camera`
      }
    }))
    .setOutputsBindings({
      out: `render.color`
    });
  }

  render () {
    var dt = this.clock.getDelta();
    var time = this.clock.getElapsedTime();
    this.update(time, dt);
    const outputs = this.pipeline.render();
    this.toScreen(outputs.out);
  }

  update (time, dt) {
    this.scene.update(time, dt);
    this.camera.update(time, dt);
    this.pipeline.update(time, dt);
  }

  setSize (width, height) {
    this.width = width;
    this.height = height;
    this.screen.setSize(width, height);
    this.renderer.setSize(width, height);
  }

  toScreen (out) {
    this.screen.material.setUniform(`uInput`, out);
    this.screen.material.updateUniform(`resolution`, (val) => val.set(this.width, this.height));
    this.screen.render(this.renderer);
  }

}
