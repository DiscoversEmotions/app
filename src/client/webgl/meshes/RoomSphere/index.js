import { Mesh, SphereGeometry, MeshBasicMaterial, TextureLoader } from 'three';

export class RoomSphere extends Mesh {
  constructor() {
    var geom = new SphereGeometry(50, 60, 40);
    geom.scale( - 1, 1, 1 );
    var material = new MeshBasicMaterial({
      map: new TextureLoader().load(require(`./room.jpg`))
    });
    super(geom, material);
  }
}
