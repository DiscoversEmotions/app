// interface Step {
//   start(stateManager, time, dt) -> void
//   update(stateManager, time, dt) -> newStep
//   stop(stateManager, time, dt) -> void
// }

export class StepsManager {
  constructor(steps, stateManager) {
    this.steps = steps;
    this.stateManager = stateManager;
    this.currentStep = this.getCurrentStepName();
  }

  startIfNot(time, dt) {
    if (!this.started) {
      this.currentStepStart(time, dt);
      this.started = true;
    }
  }

  update(time, dt) {
    this.startIfNot(time, dt);
    const nextStep = this.getCurrentStepName();
    if (_.isString(nextStep) && nextStep !== this.currentStep) {
      this.currentStepStop(time, dt);
      this.currentStep = nextStep;
      this.currentStepStart(time, dt);
    }
    this.currentStepUpdate(time, dt);
  }

  getCurrentStepName() {
    return this.stateManager.state.get(`step`);
  }

  getCurrentStep() {
    if (_.isNil(this.steps[this.currentStep])) {
      throw new Error(`Can't find step "${this.currentStep}"`);
    }
    return this.steps[this.currentStep];
  }

  currentStepUpdate(time, dt) {
    this.currentStepMethod(`update`, time, dt);
  }

  currentStepStart(time, dt) {
    this.currentStepMethod(`start`, time, dt);
  }

  currentStepStop(time, dt) {
    this.currentStepMethod(`stop`, time, dt);
  }

  currentStepMethod(methodName, time, dt) {
    const curr = this.getCurrentStep();
    if (_.isFunction(curr[methodName])) {
      curr[methodName](this.stateManager, time, dt);
    }
  }
}
