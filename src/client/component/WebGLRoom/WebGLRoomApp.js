import { GUISingleton } from '~/core/utils';
import { Core as WebGLCore, OBJLoader } from '~/core/webgl';
import { Scene } from './Scene';
import { EffectComposer, RenderPass, SMAAPass, BloomPass } from 'postprocessing';

import {
  Texture,
  ObjectLoader,
  Mesh
} from 'three';
import * as THREE from 'three';
console.log(THREE);

class WebGLMainApp extends WebGLCore {

  initScene() {
    return new Scene();
  }

  initCamera(parentElement) {
    let camera = super.initCamera(parentElement);
    camera.position.z = 5;
    return camera;
  }

  initPostComposer() {
    const composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.renderPass.renderToScreen = true;
    composer.addPass(this.renderPass);
    return composer;
  }

}

export default WebGLMainApp;
