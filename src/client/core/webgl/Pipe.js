import { Pipe as PipelinePipe } from '~/core/pipeline';

export class Pipe extends PipelinePipe {

  setSize(width, height) {
    console.log(`setSize`);
  }

}
