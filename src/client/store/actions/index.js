import * as world from './world';
import * as movement from './movement';
import * as step from './step';

export function startRecovery () {
  return world.setWorld(`mind`);
}

export {
  world,
  movement,
  step
};
