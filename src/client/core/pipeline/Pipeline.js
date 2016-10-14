import _ from 'lodash';
import { Pass } from './Pass';
import { Pipe } from './Pipe';

export class Pipeline extends Pass {

  /**
   * options: {
   *   outputsBindings: { yolo: 'hey.yolo' },
   *   inputsNames: []
   * }
   */
  constructor (options = {}) {
    options.outputsBindings = _.defaultTo(options.outputsBindings, {});
    options.inputsNames = _.defaultTo(options.inputsNames, []);

    super({
      inputsNames: options.inputsNames,
      outputsNames: _.keys(options.outputsBindings)
    });

    this.pipes = [];
    this.outputs = {};
    this.resolved = false;
    this.isPipeline = true;
  }

  addPipe (pipe) {
    if (_.find(this.pipes, { name: pipe.name })) {
      console.error(`A pipe named ${name} already exist !`);
    }
    this.pipes.push(pipe);
    this.setDirty();
    return this;
  }

  setOutputsBindings (outputsBindings) {
    this.outputsBindings = _.isNil(outputsBindings) ? {} : outputsBindings;
    this.outputsNames = _.keys(this.outputsBindings);
    this.setDirty();
    return this;
  }

  /**
   * To trigger the resolver on next render
   */
  setDirty () {
    this.resolved = false;
  }

  getPipe (pipeName) {
    const pipe = _.find(this.pipes, { name: pipeName });
    if (!pipe) {
      console.error(`Can't find a pipe named ${pipeName} !`);
    }
    return pipe;
  }

  mapInputsBinding (inputsBinding) {
    return _.mapValues(inputsBinding, (path) => {
      const pathArray = path.split(`.`);
      return this.outputs[pathArray[0]][pathArray[1]];
    });
  }

  resolvePipesDependencies () {
    if (this.resolved) { return; }
    // Let's do some recursive stuff to check that all inputs/outputs are correct.
    _.forEach(this.pipes, pipe => pipe.resetDependencies());

    const resolveDependencies = (inputs, pipe) => {
      // find dependencies
      _.forEach(inputs, (path) => {
        const pathArray = path.split(`.`);
        const pipeName = pathArray[0];
        const outputName = pathArray[1];
        // pipe exist ?
        if (pipeName === `inputs`) {
          return;
        }
        const dependPipe = this.getPipe(pipeName);
        if (_.isNil(dependPipe)) {
          throw new Error(`Can't find pipe named '${pipeName}' while resolving ${pipe ? pipe.name : `entry-pipe`}`);
        }
        // pipe has correct output ?
        const passOutputs = dependPipe.getPass().getOutputsNames();
        if (!_.includes(passOutputs, outputName)) {
          throw new Error(`Can't find output '${outputName}' in pass of pipe '${dependPipe.name} while resolving ${pipe.name}'`);
        }
        // all ok, add dependPipe as a dependency
        // NOTE: pipe in null only for entry-pipe
        if (pipe) {
          pipe.addDependency(dependPipe);
        } else {
          dependPipe.setPriorityGreaterThan(0);
        }
        // resolve dependPipe -> recursive
        resolveDependencies(dependPipe.getInputsBinding(), dependPipe);
      });
    };
    resolveDependencies(this.outputsBindings, null);
    this.detectUnusedPipes();
    this.orderedPipes = this.pipes
      .filter(pipe => pipe.priority !== 0)
      .sort((left, right) => {
        return right.priority - left.priority;
      });
    this.resolved = true;
  }

  detectUnusedPipes () {
    const unused = this.pipes.filter(pipe => pipe.priority === 0);
    if (unused.length > 0) {
      console.warn(`The following pipes are not in the dependency tree :`);
      console.warn(unused);
    }
  }

  renderPipe (pipe, inputs) {
    return pipe.render(inputs);
  }

  buildInitialInputs (inputs) {
    return inputs;
  }

  /**
   * override render to resolvePipesDependencies before
   * @type {Object}
   */
  render (inputs = {}) {
    if (false === this.resolved) { this.resolvePipesDependencies(); }
    return super.render(inputs);
  }

  run (inputs) {
    this.outputs[`inputs`] = this.buildInitialInputs(inputs);
    _.forEach(this.orderedPipes, pipe => {
      const pipeInputs = this.mapInputsBinding(pipe.getInputsBinding());
      this.outputs[pipe.name] = this.renderPipe(pipe, pipeInputs);
    });
    return this.mapInputsBinding(this.outputsBindings);
  }

  passThrough (inputs) {
    // TODO
    return {};
  }

}
