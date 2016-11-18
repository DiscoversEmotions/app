import { createSelector } from 'reselect';
import { Steps, Worlds } from '~/types';
import * as assets from './assets';

export const timeSelector = (state) => state.get(`time`);
export const clickedSelector = (state) => state.get(`clicked`);

export const stepSelector = createSelector(
  timeSelector,
  clickedSelector,
  (time, clicked) => {
    if (time < 7000) {
      return Steps.Boot;
    }
    clicked = clicked.toJS();
    if (clicked.startRecovery) {
      return Steps.RecoveryWillStart;
    }
    if (time > 7000) {
      return Steps.MissingFiles;
    }
    return Steps.Boot;
  }
);

export const worldSelector = createSelector(
  stepSelector,
  (step) => {
    switch (step) {
    case Steps.RecoveryLvl1:
    case Steps.RecoveryLvl1Done:
      return Worlds.Mind;
    default:
      return Worlds.Room;
    }
  }
);

export {
  assets
};
