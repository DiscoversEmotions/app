import { GUISingleton, EventUtils } from '~/core/utils';
import { Core as WebGLCore, OBJLoader, Camera } from '~/core/webgl';
import { EffectComposer, RenderPass, SMAAPass, BloomPass } from 'postprocessing';
import { Scene } from './Scene';
import { Texture, ObjectLoader, Mesh, Vector3, Object3D } from 'three';

class WebGLRoomApp extends WebGLCore {

  constructor(parentElement) {
    super(parentElement);
    this.addEvents();
  }

  initAssetsManager() {
    var manager = super.initAssetsManager();
    var texture = new Texture();
  }

  initScene() {
    return new Scene();
  }

  initCamera(parentElement) {
    var camera = new Camera(parentElement, 75, this.width / this.height, 1, 1100, false);
    return camera;
  }

  initPostComposer() {
    const composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.renderPass.renderToScreen = true;
    composer.addPass(this.renderPass);
    return composer;
  }

  addEvents() {
    document.addEventListener(`mousemove`, this.onMouseMove.bind(this), false );
  }

  onMouseMove(e) {
    const offset = EventUtils.getOffsetOf(e, this.parentElement);
    this.camera.rotation.y = - offset.x / this.width * 2;
    // this.camVertical.rotation.x = - offset.y / this.height;
  }

}

export default WebGLRoomApp;
