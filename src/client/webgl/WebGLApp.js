import { Scene } from './Scene';
import { Renderer } from './Renderer';

export class WebGLApp {

  constructor(parentElement) {
    this.parentElement = parentElement;
    this.lastState = null;

    this.width = null;
    this.height = null;
    this.started = false;

    this.scene = new Scene();
    this.renderer = new Renderer();
  }

  update(stateManager, time, dt) {
    if (stateManager.state !== this.lastState) {
      this.stateUpdate(stateManager, time, dt);
      this.lastState = stateManager.state;
    }
  }

  stateUpdate(stateManager, time, dt) {
    this.resize(stateManager.state);
  }

  init(stateManager) {
    this.resize(stateManager.state);
    // Append to DOM
    this.parentElement.appendChild( this.renderer.domElement );
  }

  resize(state) {
    if (this.width !== state.get(`width`) || this.height !== state.get(`height`)) {
      this.width = state.get(`width`);
      this.height = state.get(`height`);
      this.renderer.setSize(this.width, this.height);
    }
  }

}
