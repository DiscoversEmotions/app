import { Composer, CopyPass } from 'wagner';
import { WindowResizeSingleton } from './WindowResizeSingleton';
import { WebGLRenderTarget } from 'three';
import DepthPass from '~/passes/depth/DepthPass';
import * as THREE from 'three';

import vertex from '~/passes/depth/depth_vert';
import fragment from '~/passes/depth/depth_frag';

/**
 * PostProcessing
 */
export class PostProcessing {

  /**
   * constructor method
   */
  constructor(renderer) {
    // TODO: make it an option
    this.active = true;
    this.renderer = renderer;
    this.effects = this.initEffects();
    this.composer = new Composer(renderer);

    this.secondTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
    this.secondTarget.texture.format = THREE.RGBFormat;
    this.secondTarget.texture.minFilter = THREE.NearestFilter;
    this.secondTarget.texture.magFilter = THREE.NearestFilter;
    this.secondTarget.texture.generateMipmaps = false;
    this.secondTarget.stencilBuffer = false;
    this.secondTarget.depthBuffer = true;
    this.secondTarget.depthTexture = new THREE.DepthTexture();
    this.secondTarget.depthTexture.type = THREE.UnsignedShortType;

    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.postMaterial = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        cameraNear: { value: 0 },
        cameraFar:  { value: 0 },
        tDiffuse:   { value: new THREE.Texture() },
        tDepth:     { value: new THREE.Texture() }
      }
    });
    var postPlane = new THREE.PlaneGeometry(2, 2);
    var postQuad = new THREE.Mesh(postPlane, this.postMaterial);
    this.postScene = new THREE.Scene();
    this.postScene.add(postQuad);


    WindowResizeSingleton.getInstance().add(this.resize.bind(this));
  }

  resize(width, height) {
    this.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio);
  }

  initEffects () {
    return [];
  }

  update (time, dt) {

  }

  render (scene, camera) {
    if(this.active) {

      this.postMaterial.uniforms.tDepth.value = this.secondTarget.depthTexture;
      this.postMaterial.uniforms.tDiffuse.value = this.secondTarget.texture;
      this.postMaterial.uniforms.cameraNear.value = 0.1;
      this.postMaterial.uniforms.cameraFar.value = 10;
      this.renderer.render(scene, camera, this.secondTarget);

      // this.composer.reset();
      // this.composer.render(scene, camera);
      // this.composer.pass(this.depthPass);
      // // this.effects
      // //   .filter(effect => effect.active)
      // //   .forEach(effect => {
      // //     this.composer.pass(effect.pass);
      // //   });
      // this.composer.toScreen();

      this.renderer.render( this.postScene, this.postCamera );
    } else {
      this.renderer.render(scene, camera);
    }
  }
}
