import _ from 'lodash';
import { Pass } from './Pass';

export class Pipe {

  /**
   *
   */
  constructor(inputsNames, outputsNames) {
    this._active = true;
    this._dirty = true;
    this._isRendering = false;
    this.isPipe = true;

    // inputsNames
    this._inputsNames = inputsNames || null;

    // outputsNames
    this._outputsNames = outputsNames || null;
  }

  /**
   * Method to override
   */

  // when pipe._active === true
  run (inputs) {
    if (!this._isRendering) {
      throw new Error(`run should not be called directly, use render !`);
    }
    return;
  }

  // when pipe._active === false
  passThrough (inputs) {
    if (!this._isRendering) {
      throw new Error(`run should not be called directly, use render !`);
    }
    return;
  }

  /**
   * Public API
   */

  render (inputs) {
    this._isRendering = true;
    if (this._dirty) {
      this._validate();
    }
    this._validateInputs(inputs);
    var outputs;
    if (this._active) {
      outputs = this.run(inputs);
    } else {
      outputs = this.passThrough(inputs);
    }
    this._validateOutputs(outputs);
    this._isRendering = false;
    return outputs;
  }

  setInputsNames (inputsNames) {
    this._inputsNames = _.isNil(inputsNames) ? [] : inputsNames;
    this._setDirty();
  }

  setOutputsNames (outputsNames) {
    this._outputsNames = _.isNil(outputsNames) ? [] : outputsNames;
    this._setDirty();
  }

  getInputsNames() {
    return this._inputsNames;
  }

  getOutputsNames() {
    return this._outputsNames;
  }

  /**
   * Private
   */

  _setDirty () {
    this._dirty = true;
  }

  _validateInputs (inputs) {
    if (inputs.length > 0 && !_.includes(this._inputsNames, _.keys(inputs))) {
      throw new Error(`You tried to run with inputs [${_.keys(inputs).join(`, `)}] but valid inputs are [${this._inputsNames.join(`, `)}]`);
    }
  }

  _validateOutputs (outputs) {
    if (outputs.length > 0 && !_.includes(this._outputsNames, _.keys(outputs))) {
      throw new Error(`The run or passThrough return [${_.keys(outputs).join(`, `)}] but valid outputs are [${this._outputsNames.join(`, `)}]`);
    }
  }

  _validate () {
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
    this._dirty = false;
  }

}
