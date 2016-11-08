import _ from 'lodash';

// class Step {
//   start(time, dt, state, updateState) -> void
//   update(time, dt, state, updateState) -> (newStep: string) | null
//   stop(time, dt, state, updateState) -> void
// }

export class StateManager {

  constructor(steps, initialState, onStateUpdate) {
    if (_.isNil(steps[`init`])) {
      throw new Error(`Steps must contain a 'init' step`);
    }
    this.steps = steps;
    this.currentStep = `init`;
    this.state = initialState;
    this.onStateUpdate = onStateUpdate;
    this.started = false;

    // bind
    this.updateStateFromStep = this.updateStateFromStep.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  startIfNot(time, dt) {
    if (!this.started) {
      this.onStateUpdate(this.state, this.updateState);
      this.startCurrentStep(time, dt);
      this.started = true;
    }
  }

  update(time, dt) {
    this.startIfNot(time, dt);
    var nextStep = this.updateCurrentStep(time, dt);
    if (_.isString(nextStep) && nextStep !== this.currentStep) {
      this.stopCurrentStep(time, dt);
      this.currentStep = nextStep;
      this.startCurrentStep(time, dt);
    }
  }

  updateState(updater, notifyStep = true) {
    var lastState = this.state;
    this.state = updater(this.state);
    if (this.state === lastState) {
      return; // Nothing changed
    }
    if (notifyStep) {
      this.notifyStep();
    }
    this.onStateUpdate(this.state, this.updateState);
  }

  updateStateFromStep(updater) {
    return this.updateState(updater, false);
  }

  notifyStep() {
    this.getCurrentStep().update();
  }

  getCurrentStep() {
    if (_.isNil(this.steps[this.currentStep])) {
      throw new Error(`Can't find step "${this.currentStep}"`);
    }
    return this.steps[this.currentStep];
  }

  updateCurrentStep(time, dt) {
    return this.execOnCurrentStep(`update`, time, dt);
  }

  startCurrentStep(time, dt) {
    return this.execOnCurrentStep(`start`, time, dt);
  }

  stopCurrentStep(time, dt) {
    return this.execOnCurrentStep(`stop`, time, dt);
  }

  execOnCurrentStep(methodName, time, dt) {
    const curr = this.getCurrentStep();
    if (_.isFunction(curr[methodName])) {
      return curr[methodName](time, dt, this.state, this.updateStateFromStep);
    }
    return null;
  }

}
