import { BoxGeometry, BufferGeometry, BufferAttribute } from '~/three';

/**
 * CubeGeometry class
 */
class CubeBufferGeometry extends BufferGeometry {

  /**
   * constructor method
   */
  constructor() {
    super();
    this.fromGeometry(new BoxGeometry(1, 1, 1));
    // Create attributes
    // let positions = this.getAttribute('position');
    // let displacement = [];
    // for (var v = 0; v < positions.count; v++) {
    //   displacement.push(Math.random() * 0.8);
    //   displacement.push(Math.random() * 0.8);
    // }
    // var displacementArr = new Float32Array(displacement);
    // this.addAttribute( 'displacement', new BufferAttribute( displacementArr, 2 ) );
  }
}

export default CubeBufferGeometry;
