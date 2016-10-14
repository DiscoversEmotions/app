import { Effect } from '../Effect';
import copyFragmentShader from '~/core/webgl/shaders/copy.frag';

export class CopyEffect extends Effect {

  constructor() {
    super(copyFragmentShader);
  }

}
