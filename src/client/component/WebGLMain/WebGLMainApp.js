import { GUISingleton } from '~/core/utils';
import { Core as WebGLCore } from '~/core/webgl';
import { Pipe } from '~/core/pipeline';
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

  initRenderPipeline () {
    return super.initRenderPipeline()
    .mapOutputs({
      screen: `render.color`
    });
  }

}

export default WebGLMainApp;
