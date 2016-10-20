
export class PipelineItem {

  /**
   * options: { name, mapInputs, pipe, mapOutputs }
   * @type {Object}
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
    if (pipe.isPipe !== true) {
      throw new Error(`options.pipe must be a Pipe !`);
    }
    this._pipe = options.pipe;

    // MapInputs
    this._mapInputs = !_.isNil(options.mapInputs) ? options.mapInputs : null;

    // MapOutputs
    this._mapOutputs = !_.isNil(options.mapOutputs) ? options.mapOutputs : null;
  }

  getName () {
    return this._name;
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
    return _.concat(_.flatten(_.map(this._dependencies, dep => dep.getAllDependencies())));
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
