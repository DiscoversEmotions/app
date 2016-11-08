// interface Step {
//   start(stateManager, time, dt) -> void
//   update(stateManager, time, dt) -> newStep
//   stop(stateManager, time, dt) -> void
// }

export class StepsManager {
  constructor(steps, stateManager) {
    if (_.isNil(steps[`init`])) {
      throw new Error(`Steps must contain a 'init' step`);
    }
    this.steps = steps;
    this.stateManager = stateManager;
    this.currentStep = `init`;
  }

  startIfNot(time, dt) {
    if (!this.started) {
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
      return curr[methodName](this.stateManager, time, dt);
    }
    return null;
  }
}
