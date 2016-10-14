import {
  MeshBasicMaterial, Scene, Mesh, PlaneBufferGeometry, OrthographicCamera, WebGLRenderTarget,
  LinearFilter, ClampToEdgeWrapping, RGBAFormat, RGBFormat, UnsignedByteType, ShaderMaterial
} from 'three';
import CopyPass from './passes/copy/CopyPass';
import Stack from './Stack';
import Pass from './Pass';

export class Composer {
  constructor(renderer, settings) {
    const pixelRatio = renderer.getPixelRatio();

    this.width  = Math.floor(renderer.context.canvas.width  / pixelRatio) || 1;
    this.height = Math.floor(renderer.context.canvas.height / pixelRatio) || 1;

    this.output = null;
    this.input = null;
    this.read = null;
    this.write = null;

    this.settings = settings || {};
    this.useRGBA = this.settings.useRGBA || false;

    this.renderer = renderer;
    this.copyPass = new CopyPass(this.settings);

    this.defaultMaterial = new MeshBasicMaterial({color: 0x00FF00, wireframe: false});
    this.scene = new Scene();
    this.quad = new Mesh(new PlaneBufferGeometry(1, 1), this.defaultMaterial);
    this.scene.add(this.quad);
    this.camera = new OrthographicCamera(1, 1, 1, 1, -10000, 10000);

    this.front = new WebGLRenderTarget(1, 1, {
      minFilter: this.settings.minFilter !== undefined ? this.settings.minFilter : LinearFilter,
      magFilter: this.settings.magFilter !== undefined ? this.settings.magFilter : LinearFilter,
      wrapS: this.settings.wrapS !== undefined ? this.settings.wrapS : ClampToEdgeWrapping,
      wrapT: this.settings.wrapT !== undefined ? this.settings.wrapT : ClampToEdgeWrapping,
      format: this.useRGBA ? RGBAFormat : RGBFormat,
      type: this.settings.type !== undefined ? this.settings.type : UnsignedByteType,
      stencilBuffer: this.settings.stencilBuffer !== undefined ? this.settings.stencilBuffer : true
    });

    this.back = this.front.clone();
    this.startTime = Date.now();
    this.passes = {};

    this.setSize(this.width, this.height);
  }

  swapBuffers() {
    this.output = this.write;
    this.input = this.read;

    const t = this.write;
    this.write = this.read;
    this.read = t;
  }

  render(scene, camera, keep, output) {
    if (keep) this.swapBuffers();
    this.renderer.render(scene, camera, output ? output : this.write, true);
    if (!output) this.swapBuffers();
  }

  toScreen() {
    this.quad.material = this.copyPass.shader;
    this.quad.material.uniforms.tInput.value = this.read;
    this.quad.material.uniforms.resolution.value.set(this.width, this.height);
    this.renderer.render(this.scene, this.camera);
  }

  toTexture(t) {
    this.quad.material = this.copyPass.shader;
    this.quad.material.uniforms.tInput.value = this.read;
    this.renderer.render(this.scene, this.camera, t, false);
  }

  pass(pass) {
    if (pass instanceof Stack) {
      this.passStack(pass);
    }
    else {
      if (pass instanceof ShaderMaterial) {
        this.quad.material = pass;
      }
      if (pass instanceof Pass) {
        pass.run(this);
        return;
      }

      if (!pass.isSim) {
        this.quad.material.uniforms.tInput.value = this.read;
      }

      this.quad.material.uniforms.resolution.value.set(this.width, this.height);
      this.quad.material.uniforms.time.value = 0.001 * (Date.now() - this.startTime);
      this.renderer.render(this.scene, this.camera, this.write, false);
      this.swapBuffers();
    }
  }

  passStack(stack) {
    stack.getPasses().forEach(pass => {
      this.pass(pass);
    });
  }

  reset() {
    this.read = this.front;
    this.write = this.back;
    this.output = this.write;
    this.input = this.read;
  }

  setSource(src) {
    this.quad.material = this.copyPass.shader;
    this.quad.material.uniforms.tInput.value = src;
    this.renderer.render(this.scene, this.camera, this.write, true);
    this.swapBuffers();
  }

  setSize(w, h) {
    this.width = w;
    this.height = h;

    this.camera.projectionMatrix.makeOrthographic( w / - 2, w / 2, h / 2, h / - 2, this.camera.near, this.camera.far );
    this.quad.scale.set( w, h, 1 );

    this.front.setSize( w, h );
    this.back.setSize( w, h );
  }
}
