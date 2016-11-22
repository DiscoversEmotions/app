import { Mesh, BoxBufferGeometry, MeshLambertMaterial, FlatShading } from '~/three';

export class Tile extends Mesh {
  constructor() {
    const geom = new BoxBufferGeometry( 1, 0.1, 1 );
    const mat = new MeshLambertMaterial({ color: 0xff0000, shading: FlatShading });
    super(geom, mat);
  }
}
