import { WebGLCore } from '~/core';
import { Scene } from './Scene';

class WebGLMainApp extends WebGLCore {

  initScene () {
    return new Scene();
  }

  initCamera (parentElement) {
    let camera = super.initCamera(parentElement);
    camera.position.z = 5;
    return camera;
  }

}

export default WebGLMainApp;
