import { Pipe } from '~/core/webgl/Pipe';
import { DepthTexture, WebGLRenderTarget, UnsignedShortType } from 'three';
import * as THREE from 'three';

export class RenderPipe extends Pipe {

  /**
   *
   */
  constructor() {
    super(
      [`renderer`, `scene`, `camera`],
      [`color`, `depth`]
    );
    this.renderTaget = new WebGLRenderTarget( 600, 600 );
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

  setSize(width, height) {
    this.renderTaget.setSize(width, height);
  }

}
