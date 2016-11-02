import {
  GUISingleton
} from '~/core/utils';
import {
  Core as WebGLCore,
  OBJLoader
} from '~/core/webgl';
import {
  Scene
} from './Scene';
import {
  EffectComposer,
  RenderPass,
  SMAAPass,
  BloomPass
} from 'postprocessing';

import {
  Texture,
  ObjectLoader,
  Mesh
} from 'three';
import * as THREE from 'three';
console.log(THREE);

class WebGLMainApp extends WebGLCore {

  initAssetsManager() {
    var manager = super.initAssetsManager();
    var texture = new Texture();

    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total);
    };
    var onProgress = function (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(`${Math.round(percentComplete, 2)}% downloaded`);
      }
    };
    var onError = function (xhr) {};
    var loader = new OBJLoader(manager);
    loader.load(require(`~/meshes/Ground/plane.obj`), (object) => {
      object.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = this.scene.cube1.material;
          child.scale.set(0.05, 0.05, 0.05);
          this.scene.add(child);
        }
      });
      object.position.y = -95;
    }, onProgress, onError);
  }

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
    // SMAA
    this.smaaPass = new SMAAPass(window.Image);
    this.smaaPass.enabled = false;
    composer.addPass(this.smaaPass);
    // Bloom
    this.bloomPass = new BloomPass();
    this.bloomPass.renderToScreen = true;
    this.bloomPass.enabled = false;
    composer.addPass(this.bloomPass);
    return composer;
  }

}

export default WebGLMainApp;
