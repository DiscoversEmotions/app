import * as world from './world';

export function switchColor () {
  return (state) => {
    if (state.get(`color`) === `red`) {
      return state.set(`color`, `blue`);
    }
    return state.set(`color`, `red`);
  };
}

export {
  world
};
