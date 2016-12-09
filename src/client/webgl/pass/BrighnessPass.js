import { ShaderMaterial } from 'three';
import { Pass } from 'postprocessing';

import fragment from './brightness.frag.glsl';
import vertex from './brightness.vert.glsl';

class BrightnessMaterial extends ShaderMaterial {
  constructor() {
    super({
      type: `BrightnessMaterial`,
      uniforms: {
        tDiffuse: { value: null },
        brightness: { value: 0.0 },
        contrast: { value: 1.3 }
      },
      fragmentShader: fragment,
      vertexShader: vertex
    });
  }
}

export class BrightnessPass extends Pass {

  constructor() {
    super();
    this.needsSwap = true;
    this.material = new BrightnessMaterial();
    this.quad.material = this.material;
  }

  render(renderer, readBuffer, writeBuffer) {
    this.material.uniforms.tDiffuse.value = readBuffer.texture;
    if(this.renderToScreen) {
      renderer.render(this.scene, this.camera);
    } else {
      renderer.render(this.scene, this.camera, writeBuffer, false);
    }
  }

}
