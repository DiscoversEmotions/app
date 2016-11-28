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
    priority: 10,
  },
  {
    key: `room`,
    fileUrl: require(`~/assets/room.jpg`),
    type: AssetTypes.Texture,
    status: AssetStatus.Queued,
    priority: 0,
  },
  {
    key: `world1`,
    fileUrl: require(`~/assets/world1.awd`),
    type: AssetTypes.AWD,
    status: AssetStatus.Queued,
    priority: 10,
  },
  {
    key: `world2`,
    fileUrl: require(`~/assets/world2.awd`),
    type: AssetTypes.AWD,
    status: AssetStatus.Queued,
    priority: 20,
  },
  {
    key: `world3`,
    fileUrl: require(`~/assets/world3.awd`),
    type: AssetTypes.AWD,
    status: AssetStatus.Queued,
    priority: 20,
  },
  {
    key: `memory1`,
    fileUrl: require(`~/assets/sonSouvenirTest.ogg`),
    type: AssetTypes.Audio,
    status: AssetStatus.Queued,
    priority: 15
  }
];

export default {
  state: {
    ...(_.keyBy(assets, `key`))
  },
  signals: signals
};
