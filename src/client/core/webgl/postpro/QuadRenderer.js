import { WebGLRenderTarget, PlaneBufferGeometry, Scene, Mesh, OrthographicCamera } from 'three';
import { CopyEffect } from '~/core/webgl/postpro/effects/CopyEffect';

export class QuadRenderer {
  constructor(renderer) {
    this.renderer = renderer;
    this.width = null;
    this.height = null;
    this.target = new WebGLRenderTarget(1, 1, {
      stencilBuffer: true,
      depthBuffer: false
    });
    this.material = new CopyEffect();
    this.scene = new Scene();
    this.quad = new Mesh(new PlaneBufferGeometry(1, 1), this.material);
    this.scene.add(this.quad);
    this.camera = new OrthographicCamera(1, 1, 1, 1, -10000, 10000);
  }

  setMaterial (mat) {
    this.material = mat;
    this.quad.material = this.material;
  }

  setSize (width, height) {
    this.width = width;
    this.height = height;
    // Update camera
    this.camera.projectionMatrix.makeOrthographic(
      width / -2, width / 2,
      height / 2, height / - 2,
      this.camera.near, this.camera.far
    );
    this.quad.scale.set( width, height, 1 );
  }

  render () {
    this.renderer.render(this.scene, this.camera);
  }
}
