import _ from 'lodash';
import { Pass } from './Pass';
import { Pipe } from './Pipe';

export class Composer extends Pass {

  /**
   * options: {
   *   outputsBindings: { yolo: 'hey.yolo' },
   *   inputsNames: []
   * }
   */
  constructor (options = {}) {
    if (!_.isNil(options.outputsBindings)) {
      options.outputsBindings = {};
    }
    super({
      inputsNames: options.inputsNames,
      outputsNames: _.keys(options.outputsBindings)
    });
    this.outputsBindings = outputsBindings;

    this.pipes = [];
    this.outputs = {};
    this.resolved = false;
  }

  add (pipe) {
    if (_.find(this.pipes, { name: pipe.name })) {
      console.error(`A pipe named ${name} already exist !`);
    }
    this.pipes.push(pipe);
    this.resolved = false;
  }

  get (pipeName) {
    const pipe = _.find(this.pipes, { name: pipeName });
    if (!pipe) {
      console.error(`Can't find a pipe named ${pipeName} !`);
    }
    return pipe;
  }

  resolve () {
    if (!this.resolved) {
      return;
    }


    this.resolved = true;
  }

  validateAndRun (inputs) {
    super.validateAndRun(inputs);
    this.resolv();
  }

  run (inputs = {}) {
    this.outputs['inputs'] = inputs;
    _.forEach(this.pipesOrder, (pipeName) => {
      this.outputs[pipeName] = this.get(pipeName).run(this.outputs);
    });
    return
  }

}
