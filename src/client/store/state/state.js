import { fromJS } from 'immutable';
import { assets } from './assets';

export const initialState = fromJS({
  size: {
    width: 600,
    height: 600
  },
  stepsTimes: {},
  time: 0,
  clicked: {
    startRecovery: false
  },
  assets: assets
});
