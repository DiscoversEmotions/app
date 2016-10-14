import _ from 'lodash';

export class Pass {

  /**
   * { inputsNames, outputsNames }
   * @type {Object}
   */
  constructor(options = {}) {
    this.inputsNames = options.inputsNames;
    this.outputsNames = options.outputsNames;

    this.validated = false;
    this.active = true;
    this.isPass = true;
  }

  getOutputsNames () {
    return this.outputsNames;
  }

  /**
   * pass name for debug
   */
  validatePass () {
    // inputsNames
    if (!_.isArray(this.inputsNames)) {
      throw new Error(`Pass invalid because 'inputsNames' is not an array`);
    }
    // Outputs
    if (!_.isArray(this.outputsNames)) {
      throw new Error(`Pass invalid because 'outputsNames' is not a array`);
    }
    if (this.outputsNames.length === 0) {
      throw new Error(`Pass invalid : pass must have at least one output`);
    }
    this.validated = true;
  }

  validateInputs (inputs) {
    if (inputs.length > 0 && !_.includes(this.inputsNames, _.keys(inputs))) {
      throw new Error(`You tried to run with inputs [${_.keys(inputs).join(`, `)}] but valid inputs are [${this.inputsNames.join(`, `)}]`);
    }
  }

  validateOutputs (outputs) {
    if (outputs.length > 0 && !_.includes(this.outputsNames, _.keys(outputs))) {
      throw new Error(`The run or passThrough return [${_.keys(outputs).join(`, `)}] but valid outputs are [${this.outputsNames.join(`, `)}]`);
    }
  }

  // this is executed by composer
  render (inputs) {
    if (false === this.validated) { this.validatePass(); }
    this.validateInputs(inputs);
    var outputs;
    if (this.active) {
      outputs = this.run(inputs);
    } else {
      outputs = this.passThrough(inputs);
    }
    this.validateOutputs(outputs);
    return outputs;
  }

  // override this
  run (inputs) {
    return {};
  }

  // override this
  // this is called when pipe is disabled
  passThrough (inputs) {
    return {};
  }

}
