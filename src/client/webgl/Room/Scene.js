import { Scene as CoreScene } from '~/core/webgl';
import { GUISingleton } from '~/core/utils';
import { Cube } from '~/meshes/Cube';
import { Ground } from '~/meshes/Ground';
import { PointLight, AxisHelper, MeshLambertMaterial } from 'three';

export class Scene extends CoreScene {

  /**
   * createScene method
   */
  createScene() {
    console.trace(`create my custom scene`);

    this.cube1 = new Cube();
    this.add(this.cube1);

    this.mainLight = new PointLight();
    this.mainLight.position.set(5, 5, 5);
    this.add(this.mainLight);

    this.add(new AxisHelper(1));

    this.gui = GUISingleton.getInstance();

    this.addGUI();
  }

  addGUI() {

  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.01;

    this.cube1.update(time, dt);
  }

}
