import { Pipe } from '~/core/pipeline';


export class PostProcessingPipe extends Pipe {

  constructor(options) {
    super(options);
  }

  setSize (width, height) {
    this.pass.setSize(width, height);
  }
}
