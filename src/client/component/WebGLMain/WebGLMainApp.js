import { GUISingleton } from '~/core/utils';
import { Core as WebGLCore } from '~/core/webgl';
import { Scene } from './Scene';
import { Pipe } from '~/core/pipeline';

class WebGLMainApp extends WebGLCore {

  initScene () {
    return new Scene();
  }

  initCamera (parentElement) {
    let camera = super.initCamera(parentElement);
    camera.position.z = 5;
    return camera;
  }

  initRenderPipeline (renderer, scene, camera) {
    return super.initRenderPipeline(renderer, scene, camera);
    // .addPipe(new Pipe({
    //   name: `test`
    //
    // }))
  }

}

export default WebGLMainApp;
