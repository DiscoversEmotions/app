import _ from 'lodash';

export class Pipe {

  constructor(options = {}) {
    if (!_.isString(options.name)) {
      throw new Error(`A pipe must have a name in his options`);
    }
    if (options.name.indexOf('.') !== -1) {
      throw new Error(`A pipe name can't contain a point, you name the pipe "${options.name}"`);
    }
    if (options.name == 'inputs') {
      throw new Error(`A pipe can't be named 'inputs'`);
    }
    this.name = options.name;
    if (!(options.pass instanceof Pass)) {
      throw new Error(`A pipe must have a Pass instance in his pass options`);
    }
    // Pass should be valid when added to a pipe
    try {
      options.pass.validate();
    } catch (e) {
      console.error(e);
      throw new Error(`You tried to create a Pipe with an invalid Pass !`);
    }
    this.pass = options.pass;
    this.validateInputsBinding(options.inputsBinding);
    this.inputsBinding = options.inputsBinding;
  }

  validateInputsBinding (inputsBinding) {
    const validInputs = this.pass.inputsNames;
    _.forEach(inputsBinding, (path, inputName) => {
      if (true) {
        if (!_.includes(validInputs, inputName)) {
          throw new Error(`Invalid inputsBinding '${inputName}' valid inputs are [${this.inputsNames.join(', ')}]`);
        }
        if (path.split('.').length !== 2) {
          throw new Error(`Invalid inputsBinding path '${path}', format is '[pipeName].[outputName]'`);
        }
      }
    });
  }

  run (outputs) {
    // get inputs from outputs
    inputs = _.mapValues(this.inputsBinding, (path, inputName) => {
      const pathArray = path.split('.');
      const pipeName = pathArray[0];
      const outputName = pathArray[1];
      try {
        input = outputs[pipeName][outputName];
      } catch (e) {
        console.error(e);
        throw new Error(`The pipe ${this.name} can't find the input '${inputName}: ${path}'`);
      }
    });
    return this.pass.validateAndRun(inputs);
  }

}
