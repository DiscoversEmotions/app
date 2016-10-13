import _ from 'lodash';

export class Pass {

  /**
   * { inputsNames, outputsNames }
   * @type {Object}
   */
  constructor(options = {}) {
    this.inputsNames = options.inputsNames
    this.outputsNames = options.outputsNames;

    this.validated = false;
  }

  validate () {
    // inputsNames
    if (!_isArray(options.inputsNames)) {
      throw new Error(`Pass options must have an array of 'inputsNames'`);
    }
    // Outputs
    if (!_.isArray(options.outputsNames)) {
      throw new Error(`Pass options must have an array of 'outputsNames'`);
    }
    if (options.outputsNames.length === 0) {
      throw new Error(`Pass must have at least one output`);
    }
    this.validated = true;
  }

  validateInputs (inputs) {
    if (!_.includes(this.inputsNames, _.keys(inputs))) {
      throw new Error(`You tried to run with inputs [${inputs.join(', ')}] but valid inputs are [${this.inputsNames.join(', ')}]`);
    }
  }

  validateAndRun (inputs) {
    if (false === this.validated) { this.validate(); }
    this.validateInputs(inputs);
  }

  run (inputs) {
    return {};
  }

}
