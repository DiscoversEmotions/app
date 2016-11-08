export class StepsManager {
  constructor(steps) {
    if (_.isNil(steps[`init`])) {
      throw new Error(`Steps must contain a 'init' step`);
    }
    this.steps = steps;
    this.currentStep = `init`;
  }

  startIfNot(stateManager, time, dt) {
    if (!this.started) {
      this.currentStepStart(time, dt);
      this.started = true;
    }
  }

  update(stateManager, time, dt) {
    this.startIfNot(stateManager, time, dt);
    var nextStep = this.currentStepUpdate(stateManager, time, dt);
    if (_.isString(nextStep) && nextStep !== this.currentStep) {
      this.currentStepStop(stateManager, time, dt);
      this.currentStep = nextStep;
      this.currentStepStart(stateManager, time, dt);
    }
  }

  getCurrentStep() {
    if (_.isNil(this.steps[this.currentStep])) {
      throw new Error(`Can't find step "${this.currentStep}"`);
    }
    return this.steps[this.currentStep];
  }

  currentStepUpdate(stateManager, time, dt) {
    return this.currentStepMethod(`update`, stateManager, time, dt);
  }

  currentStepStart(stateManager, time, dt) {
    return this.currentStepMethod(`start`, stateManager, time, dt);
  }

  currentStepStop(stateManager, time, dt) {
    return this.currentStepMethod(`stop`, stateManager, time, dt);
  }

  currentStepMethod(methodName, stateManager, time, dt) {
    const curr = this.getCurrentStep();
    if (_.isFunction(curr[methodName])) {
      return curr[methodName](stateManager, time, dt);
    }
    return null;
  }
}
