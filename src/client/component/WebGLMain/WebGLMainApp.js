import { GUISingleton } from '~/core/utils';
import { Core as WebGLCore } from '~/core/webgl';
import { Scene } from './Scene';
import { EffectComposer, RenderPass, SMAAPass, BloomPass } from 'postprocessing';

class WebGLMainApp extends WebGLCore {

  initScene () {
    return new Scene();
  }

  initCamera (parentElement) {
    let camera = super.initCamera(parentElement);
    camera.position.z = 5;
    return camera;
  }

  initPostComposer () {
    const composer = new EffectComposer(this.renderer);
    composer.addPass(
      new RenderPass(this.scene, this.camera)
    );
    // SMAA
    this.smaaPass = new SMAAPass(window.Image);
    composer.addPass(this.smaaPass);
    // Bloom
    this.bloomPass = new BloomPass();
    this.bloomPass.renderToScreen = true;
    composer.addPass(this.bloomPass);
    return composer;
  }

}

export default WebGLMainApp;
