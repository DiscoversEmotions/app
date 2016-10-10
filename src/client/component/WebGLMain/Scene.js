import { Scene as CoreScene } from '~/core';
import { Cube } from '~/meshes/cube';

export class Scene extends CoreScene {

  /**
   * createScene method
   */
  createScene() {
    console.log('create my custom scene');

    let cube = new Cube();
    this.add( cube );
  }

}
