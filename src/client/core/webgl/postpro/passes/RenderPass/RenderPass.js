import { Pass } from '~/core/pipeline';
import { DepthTexture, WebGLRenderTarget, UnsignedShortType } from 'three';
import * as THREE from 'three';

export class RenderPass extends Pass {

  /**
   *
   */
  constructor() {
    super({
      inputsNames: [`renderer`, `scene`, `camera`],
      outputsNames: [`color`, `depth`]
    });
    this.renderTaget = new WebGLRenderTarget( window.innerWidth, window.innerHeight );
    this.renderTaget.texture.format = THREE.RGBAFormat;
    this.renderTaget.texture.minFilter = THREE.NearestFilter;
    this.renderTaget.texture.magFilter = THREE.NearestFilter;
    this.renderTaget.texture.generateMipmaps = false;
    this.renderTaget.stencilBuffer = false;
    this.renderTaget.depthBuffer = true;
    this.renderTaget.depthTexture = new THREE.DepthTexture();
    this.renderTaget.depthTexture.type = THREE.UnsignedShortType;
  }

  run (inputs) {
    this.renderTaget.setSize(inputs.renderer.getSize().width, inputs.renderer.getSize().height);
    inputs.renderer.render(inputs.scene, inputs.camera, this.renderTaget);
    return {
      color: this.renderTaget.texture,
      depth: this.renderTaget.depthTexture
    };
  }

  passThrough (inputs) {
    return {
      color: null,
      depth: null
    };
  }

}
