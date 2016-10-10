import { PerspectiveCamera } from 'three';
import OrbitControls from './OrbitControls';
import { WindowResizeSingleton } from './WindowResizeSingleton';
import { GUISingleton } from './GUISingleton';

/**
 * Camera class
 */
export class Camera extends PerspectiveCamera {

  /**
   * constructor method
   */
  constructor(element, fov, aspect, near, far) {
    super(fov, aspect, near, far);

    this.controls = new OrbitControls(this, element);
    this.controls.enabled = true;

    this.gui = GUISingleton.getInstance();

    WindowResizeSingleton.getInstance().add(this.resize.bind(this));

    this.addGUI();
  }

  /**
   * addGUI method
   */
  addGUI() {
    this.gui.add('camera', (panel) => {
      panel.add(this.controls, 'enabled', { label: 'OrbitControls' });
    });
  }

  /**
   * update method
   * @param {number} delta Delta
   */
  update(time, dt) {
    // this.controls.update(dt);
  }

  /**
   * resize method
   * @param {number} width  Width
   * @param {number} height Height
   */
  resize(width, height) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}
