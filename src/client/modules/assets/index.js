import {
  state,
  set,
  wait
} from 'cerebral/operators';
import { AssetStatus, AssetTypes } from '~/types';
import signals from './signals';
import _ from 'lodash';

const assets = [
  {
    key: `perso`,
    fileUrl: require(`~/assets/perso.json`),
    type: AssetTypes.Json,
    status: AssetStatus.Queued,
    priority: 0,
  },
  {
    key: `room`,
    fileUrl: require(`~/assets/room.jpg`),
    type: AssetTypes.Texture,
    status: AssetStatus.Queued,
    priority: 10,
  },
  {
    key: `lvl1`,
    fileUrl: require(`~/assets/lvl1.awd`),
    type: AssetTypes.AWD,
    status: AssetStatus.Queued,
    priority: 10,
  }
];

export default {
  state: {
    ...(_.keyBy(assets, `key`))
  },
  signals: signals
};
