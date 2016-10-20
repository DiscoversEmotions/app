import _ from 'lodash';
import { Pass } from './Pass';

export class Pipe {

  /**
   *
   */
  constructor(inputsNames, outputsNames) {
    this._active = true;
    this._dirty = true;
    this.isPipe = true;

    // inputsNames
    this._inputsNames = inputsNames || null;

    // outputsNames
    this._outputsNames = outputsNames || null;
  }

  validateInputs (inputs) {
    if (inputs.length > 0 && !_.includes(this._inputsNames, _.keys(inputs))) {
      throw new Error(`You tried to run with inputs [${_.keys(inputs).join(`, `)}] but valid inputs are [${this._inputsNames.join(`, `)}]`);
    }
  }

  validateOutputs (outputs) {
    if (outputs.length > 0 && !_.includes(this._outputsNames, _.keys(outputs))) {
      throw new Error(`The run or passThrough return [${_.keys(outputs).join(`, `)}] but valid outputs are [${this._outputsNames.join(`, `)}]`);
    }
  }

  validate () {
    // To be `runnable` a pipe must have inputsNames and outputsNames not null
    if (!_.isArray(this._inputsNames)) {
      throw new Error(`'inputsNames' must be an array (it can be empty)`);
    }
    if (!_.isArray(this._outputsNames)) {
      throw new Error(`'outputsNames' must be an array (it can be empty)`);
    }
    if (this._outputsNames.length === 0) {
      console.warn(`Warning, pipe have no output.`);
    }
  }

  // this is executed by composer
  render (inputs) {
    if (this._dirty) {
      this.validate();
    }
    this.validateInputs(inputs);
    var outputs;
    if (this._active) {
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
  // this is called when pipe.active is false
  passThrough (inputs) {
    return {};
  }

}
