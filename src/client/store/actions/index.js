import * as world from './world';
import * as movement from './movement';
import * as step from './step';
import * as time from './time';

export function startRecovery () {
  return world.setWorld(`mind`);
}

export {
  world,
  movement,
  step,
  time
};
