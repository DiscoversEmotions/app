import _ from 'lodash';

// class Step {
//   start(state, updateState, time: num | false, dt) -> void
//   update(state, updateState, time: num | false, dt) -> (newStep: string) | null
//   stop(state, updateState, time: num | false, dt) -> void
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
    this.updateState = this.updateState.bind(this);
  }

  startIfNot(time, dt) {
    if (!this.started) {
      this.onStateUpdate(this.state, this.updateState);
      this.currentStepStart(time, dt);
      this.started = true;
    }
  }

  update(time, dt) {
    this.startIfNot(time, dt);
    var nextStep = this.currentStepUpdate(time, dt);
    if (_.isString(nextStep) && nextStep !== this.currentStep) {
      this.currentStepStop(time, dt);
      this.currentStep = nextStep;
      this.currentStepStart(time, dt);
    }
  }

  updateState(updater, notifyStep = true) {
    var lastState = this.state;
    this.state = updater(this.state);
    if (this.state === lastState) {
      return; // Nothing changed
    }
    if (notifyStep) {
      // update with no time
      this.update(false);
    }
    this.onStateUpdate(this.state, this.updateState);
  }

  getCurrentStep() {
    if (_.isNil(this.steps[this.currentStep])) {
      throw new Error(`Can't find step "${this.currentStep}"`);
    }
    return this.steps[this.currentStep];
  }

  currentStepUpdate(time, dt) {
    return this.currentStepMethod(`update`, time, dt);
  }

  currentStepStart(time, dt) {
    return this.currentStepMethod(`start`, time, dt);
  }

  currentStepStop(time, dt) {
    return this.currentStepMethod(`stop`, time, dt);
  }

  currentStepMethod(methodName, time, dt) {
    const curr = this.getCurrentStep();
    if (_.isFunction(curr[methodName])) {
      return curr[methodName](this.state, (updater) => this.updateState(updater, false), time, dt);
    }
    return null;
  }

}
