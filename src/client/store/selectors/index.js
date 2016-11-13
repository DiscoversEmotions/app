import {
  createSelector
} from 'reselect';
import { Steps, Worlds } from '~/store';

export const timeSelector = (state) => state.get(`time`);

export const stepSelector = createSelector(
  [timeSelector],
  (time) => {
    if (time > 7000) {
      return Steps.MissingFiles;
    }
    return Steps.Boot;
  }
);

export const worldSelector = createSelector(
  [stepSelector],
  (step) => {
    console.log(step);
    switch (step) {
    case Steps.RecoveryLvl1:
    case Steps.RecoveryLvl1Done:
      return Worlds.Mind;
    default:
      return Worlds.Room;
    }
  }
);
