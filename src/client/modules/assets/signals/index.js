import { wait, set, state } from 'cerebral/operators';
import { yoloAction } from '../actions';

export default {
  doTheYolo: [
    ...wait(1000, [
      yoloAction
    ])
  ]
};
