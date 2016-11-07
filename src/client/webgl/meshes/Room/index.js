import { Mesh, SphereGeometry, MeshBasicMaterial, TextureLoader } from 'three';
import { GUISingleton } from '~/core/utils';
import CubeBufferGeometry from './CubeBufferGeometry';
import CubeMaterial from './CubeMaterial';

export class Room extends Mesh {
  constructor() {
    var geom = new SphereGeometry(500, 60, 40);
    var material = new MeshBasicMaterial({
			map: new TextureLoader().load(require('./room.jpg'))
		});
    super(geom, material);
  }
}
