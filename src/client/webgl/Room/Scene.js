import { Scene as CoreScene } from '~/core/webgl';
import { GUISingleton } from '~/core/utils';
import { RoomSphere } from '~/webgl/meshes/RoomSphere';
import { PointLight, AxisHelper, MeshLambertMaterial } from 'three';

export class Scene extends CoreScene {

  /**
   * createScene method
   */
  createScene() {
    this.roomSphere = new RoomSphere();
    this.add(this.roomSphere);

    this.add(new AxisHelper(1));

    this.gui = GUISingleton.getInstance();

    this.addGUI();
  }

  addGUI() {

  }

  update(time, dt) {

  }

}
