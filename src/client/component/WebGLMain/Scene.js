import { Scene as CoreScene } from '~/core';
import { Cube } from '~/meshes/cube';

export class Scene extends CoreScene {

  /**
   * createScene method
   */
  createScene() {
    console.log('create my custom scene');

    this.cube = new Cube();
    this.add( this.cube );
  }

  update(dt) {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }

}
