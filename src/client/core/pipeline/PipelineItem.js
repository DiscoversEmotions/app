
export class PipelineItem {

  /**
   * options: { name, mapInputs, pipe, mapOutputs }
   */
  constructor(options = {}) {
    this._priority = 0;
    this._dependencies = []; // an array of other PipelineItem
    this.isPipelineItem = true;

    // Name
    if (!_.isString(options.name)) {
      throw new Error(`A pipeItem must have a name in his options`);
    }
    if (options.name.indexOf(`.`) !== -1) {
      throw new Error(`A pipeItem name can't contain a point, you name the pipeItem "${options.name}"`);
    }
    if (options.name == `inputs`) {
      throw new Error(`A pipeItem can't be named 'inputs'`);
    }
    this._name = options.name;

    // Pipe
    if (options.pipe && options.pipe.isPipe !== true) {
      throw new Error(`options.pipe must be a Pipe !`);
    }
    this._pipe = options.pipe;

    // MapInputs
    this._mapInputs = !_.isNil(options.mapInputs) ? options.mapInputs : {};
    const pipeInputs = this._pipe.getInputsNames();
    if (pipeInputs.length > 0 && !_.includes(pipeInputs, ...(_.keys(this._mapInputs)) )) {
      throw new Error(
        `PipeItem "${this.getName()}" mapInputs not compatibel with pipes inputs !\n` +
        `Pipe inputs are [${this._pipe.getInputsNames().join(`, `)}], get [${_.keys(this._mapInputs).join(`, `)}].`
      );
    }

    // MapOutputs
    this._mapOutputs = !_.isNil(options.mapOutputs) ? options.mapOutputs : {};
    const pipeOutputs = this._pipe.getOutputsNames();
    if (pipeOutputs.length > 0 && !_.includes(pipeOutputs, ...(_.values(this._mapOutputs)) )) {
      throw new Error(
        `PipeItem "${this.getName()}" mapOutputs not compatibel with pipes outputs !\n` +
        `Pipe outputs are [${this._pipe.getOutputsNames().join(`, `)}], get ${JSON.stringify(this._mapOutputs)}`
      );
    }
  }

  getName () {
    return this._name;
  }

  getPipe () {
    return this._pipe;
  }

  getInputsMap () {
    return this._mapInputs;
  }

  getOutputsMap () {
    return this._mapOutputs;
  }

  reset () {
    this._dependencies = [];
    this._priority = 0;
  }

  setPriorityGreaterThan (prio) {
    if (prio >= this._priority) {
      this._priority = prio + 1;
    }
  }

  getAllDependencies () {
    return _(this._dependencies)
    .map(dep => dep.getAllDependencies())
    .flatten()
    .concat()
    .value();
  }

  hasDependency (dependencyPipe) {
    return _.includes(this.getAllDependencies(), dependencyPipe.name);
  }

  addDependency (dependencyPipe) {
    if (dependencyPipe.hasDependency(this)) {
      throw new Error(`There is a circular dependency in ${this.name}.\n ${this.name} is a parent of ${dependencyPipe.name}`);
    }
    dependencyPipe.setPriorityGreaterThan(this._priority);
    this._dependencies.push(dependencyPipe.name);
  }

}
