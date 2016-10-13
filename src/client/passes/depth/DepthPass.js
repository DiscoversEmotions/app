import Pass from 'wagner/src/Pass';
import vertex from './depth_vert';
import fragment from './depth_frag';
import * as THREE from 'three';

export default class DepthPass extends Pass {

  constructor(options) {
    super();
    this.setShader(vertex, fragment);

    this.scene = options.scene;
    this.camera = options.camera;

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

  }

  run (composer) {

    composer.renderer.render(this.scene, this.camera, this.secondTarget);
    this.postMaterial.uniforms.tDepth.value = this.secondTarget.depthTexture;
    this.postMaterial.uniforms.tDiffuse.value = this.secondTarget.texture;
    this.postMaterial.uniforms.cameraNear.value = 0.1;
    this.postMaterial.uniforms.cameraFar.value = 10;

    // composer.renderer.render( this.postScene, this.postCamera );

    composer.pass(this.postMaterial);
  }

}
