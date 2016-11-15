import * as world from './world';
import * as movement from './movement';
import * as step from './step';
import * as time from './time';
import * as size from './size';
import * as stepsTimes from './stepsTimes';

export function startRecovery () {
  return (state) => {
    return state.setIn([`clicked`, `startRecovery`], true);
  };
}

export function setShowMenu (val) {
  return (state) => {
    return state.set(`showMenu`, true);
  };
}

export function showMenu () {
  return setShowMenu(true);
}

export function hideMenu () {
  return setShowMenu(false);
}

export {
  world,
  movement,
  step,
  time,
  size,
  stepsTimes
};
