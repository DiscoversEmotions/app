import * as world from './world';
import * as movement from './movement';

export function switchColor () {
  return (state) => {
    if (state.get(`color`) === `red`) {
      return state.set(`color`, `blue`);
    }
    return state.set(`color`, `red`);
  };
}

export function setStep (step) {
  return (state) => {
    return state.set(`step`, step);
  };
}

export {
  world,
  movement
};
