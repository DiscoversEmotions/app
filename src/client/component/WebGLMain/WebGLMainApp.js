import { GUISingleton } from '~/core';
import { WebGLCore } from '~/core';
import { Scene } from './Scene';
import { PostProcessing } from './PostProcessing';

class WebGLMainApp extends WebGLCore {

  initScene () {
    return new Scene();
  }

  initCamera (parentElement) {
    let camera = super.initCamera(parentElement);
    camera.position.z = 5;
    return camera;
  }

  initPostProcessing (renderer) {
    return new PostProcessing(renderer);
  }

}

export default WebGLMainApp;
