import { Scene as CoreScene, GUISingleton } from '~/core';
import { Cube } from '~/meshes/Cube';
import { Ground } from '~/meshes/Ground';
import { PointLight, AxisHelper, MeshLambertMaterial } from 'three';

export class Scene extends CoreScene {

  /**
   * createScene method
   */
  createScene() {
    console.trace('create my custom scene');

    this.cube1 = new Cube();
    this.add(this.cube1);
    this.ground = new Ground();
    this.ground.position.y = -2;
    // this.ground.rotation.x = Math.PI / 2;
    this.add(this.ground);
    this.mainLight = new PointLight();
    this.mainLight.position.set(5, 5, 5);
    this.add(this.mainLight);

    this.add(new AxisHelper(1));

    this.gui = GUISingleton.getInstance();

    this.addGUI();
  }

  addGUI() {
    this.gui.add('cube1', (panel) => {
      let positionFolder = panel.addFolder({ label: 'Cube Position' });
      let scaleFolder = panel.addFolder({ label: 'Cube Scale' });

      positionFolder.add(this.cube1.position, 'x', { label: 'position x', min: -20, max: 20, step: 1 });
      positionFolder.add(this.cube1.position, 'y', { label: 'position y', min: -20, max: 20, step: 1 });
      positionFolder.add(this.cube1.position, 'z', { label: 'position z', min: -20, max: 20, step: 1 });

      scaleFolder.add(this.cube1.scale, 'x', { label: 'scale x', min: 0, max: 10, step: 0.1 });
      scaleFolder.add(this.cube1.scale, 'y', { label: 'scale y', min: 0, max: 10, step: 0.1 });
      scaleFolder.add(this.cube1.scale, 'z', { label: 'scale z', min: 0, max: 10, step: 0.1 });
    });
  }

  update(time, dt) {
    this.cube1.rotation.x += 0.01;
    this.cube1.rotation.y += 0.01;

    this.cube1.update(time, dt);
  }

}
