import { WebGLRenderTarget, LinearFilter, RGBFormat, RGBAFormat } from 'three';
import { ShaderProcessor } from './utils/ShaderProcessor';

// Pass Interface
// run(inputs) -> outputs

export class Pass {
  constructor() {
    this.shader = null;
    this.loaded = null;
    this.params = {};
    this.isSim = false;
    this.shaderProcessor = new ShaderProcessor();
  }

  setShader(vs, fs) {
    this.shader = this.shaderProcessor.process(vs, fs);
  }

  run(composer) {
    composer.pass(this.shader);
  }

  getOfflineTexture(w, h, useRGBA) {
    return new WebGLRenderTarget(w, h, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: useRGBA ? RGBAFormat : RGBFormat
    });
  }
}
