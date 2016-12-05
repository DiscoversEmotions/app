import { Pass, CopyMaterial } from 'postprocessing';

export class CopyPass extends Pass {

  constructor() {
    super();
    this.needsSwap = true;
    this.material = new CopyMaterial();
    this.quad.material = this.material;
  }

  render(renderer, readBuffer, writeBuffer) {
    this.material.uniforms.tDiffuse.value = readBuffer.texture;
    if (this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, false);
    }
  }

}
