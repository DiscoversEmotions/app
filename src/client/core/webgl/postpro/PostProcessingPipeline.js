import _ from 'lodash';
import { Pipeline } from '~/core/pipeline';
import { WebGLRenderTarget, MeshBasicMaterial, PlaneBufferGeometry, Scene, Mesh, OrthographicCamera } from 'three';
import { CopyEffect } from '~/core/webgl/postpro/effects/CopyEffect';

/**
 * PostProcessing
 */
export class PostProcessingPipeline extends Pipeline {

  /**
   * constructor method
   * options: { outputsBindings, inputsNames, renderer, scene, camera }
   */
  constructor(options = {}) {
    super({
      outputsBindings: options.outputsBindings,
      inputsNames: _.concat(
        options.inputsNames,
        `scene`, `renderer`, `camera`,
        `ppScene`, `ppQuad`, `ppCamera`
      )
    });

    this.renderer = options.renderer;
    this.scene = options.scene;
    this.camera = options.camera;

    // PostPro
    this.ppTarget = new WebGLRenderTarget(1, 1, {
      stencilBuffer: true,
      depthBuffer: false
    });
    this.ppScene = new Scene();
    this.ppQuad = new Mesh(new PlaneBufferGeometry(1, 1), new CopyEffect());
    this.ppScene.add(this.ppQuad);
    this.ppCamera = new OrthographicCamera(1, 1, 1, 1, -10000, 10000);
  }

  /**
   * Override to inject renderer, scene and camera
   */
  buildInitialInputs (inputs) {
    return {
      scene: this.scene,
      renderer: this.renderer,
      camera: this.camera,
      ...inputs
    };
  }

  update (time, dt) {

  }

  setSize (width, height) {

  }

}
