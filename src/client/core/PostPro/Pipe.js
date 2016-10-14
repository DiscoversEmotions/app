import _ from 'lodash';
import { Pass } from './Pass';

export class Pipe {

  /**
   * options: { name, pass, inputsBinding }
   * @type {Object}
   */
  constructor(options = {}) {
    // Name
    if (!_.isString(options.name)) {
      throw new Error(`A pipe must have a name in his options`);
    }
    if (options.name.indexOf(`.`) !== -1) {
      throw new Error(`A pipe name can't contain a point, you name the pipe "${options.name}"`);
    }
    if (options.name == `inputs`) {
      throw new Error(`A pipe can't be named 'inputs'`);
    }
    this.name = options.name;
    // Pass
    if (!(options.pass instanceof Pass)) {
      throw new Error(`'options.pass' must be a Pass instance`);
    }
    // Pass should be valid when added to a pipe
    options.pass.validatePass();
    this.pass = options.pass;
    // InputsBinding
    this.validateInputsBinding(options.inputsBinding);
    this.inputsBinding = options.inputsBinding;

    this.dependencies = [];
    this.priority = 0;
  }

  validateInputsBinding (inputsBinding) {
    const validInputs = this.pass.inputsNames;
    _.forEach(inputsBinding, (path, inputName) => {
      if (true) {
        if (!_.includes(validInputs, inputName)) {
          throw new Error(`Invalid inputsBinding '${inputName}' valid inputs are [${this.inputsNames.join(`, `)}]`);
        }
        if (path.split(`.`).length !== 2) {
          throw new Error(`Invalid inputsBinding path '${path}', format is '[pipeName].[outputName]'`);
        }
      }
    });
  }

  getInputsBinding () {
    return this.inputsBinding;
  }

  setInputsBinding (inputsBinding) {
    this.inputsBinding = inputsBinding;
  }

  getPass () {
    return this.pass;
  }

  resetDependencies () {
    this.dependencies = [];
    this.priority = 0;
  }

  getAllDependencies () {
    return _.concat(_.flatten(_.map(this.dependencies, dep => dep.getAllDependencies())));
  }

  hasDependency (dependencyPipe) {
    return _.includes(this.getAllDependencies(), dependencyPipe.name);
  }

  setPriorityGreaterThan (prio) {
    if (prio >= this.priority) {
      this.priority = prio + 1;
    }
  }

  addDependency (dependencyPipe) {
    if (dependencyPipe.hasDependency(this)) {
      throw new Error(`There is a circular dependency in ${this.name}.\n ${this.name} is a parent of ${dependencyPipe.name}`);
    }
    dependencyPipe.setPriorityGreaterThan(this.priority);
    this.dependencies.push(dependencyPipe.name);
  }

  render (inputs) {
    return this.pass.render(inputs);
  }

}
