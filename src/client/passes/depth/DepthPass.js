import Pass from 'wagner/src/Pass';
import vertex from './depth_vert';
import fragment from './depth_frag';

export default class DepthPass extends Pass {

  constructor() {
    super();
    this.setShader(vertex, fragment);
  }

  run (composer) {
    composer.pass(this.shader);
  }

}
