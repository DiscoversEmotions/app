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
    key: `particleTexture`,
    fileUrl: require(`~/assets/particle.png`),
    type: AssetTypes.Texture,
    status: AssetStatus.Queued,
    priority: 10,
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
    key: `memory_anger`,
    fileUrl: require(`~/assets/memory_anger.ogg`),
    type: AssetTypes.Audio,
    status: AssetStatus.Queued,
    priority: 15
  },
  {
    key: `memory_love`,
    fileUrl: require(`~/assets/memory_love.ogg`),
    type: AssetTypes.Audio,
    status: AssetStatus.Queued,
    priority: 15
  },
  {
    key: `memory_sadness`,
    fileUrl: require(`~/assets/memory_sadness.ogg`),
    type: AssetTypes.Audio,
    status: AssetStatus.Queued,
    priority: 15
  },
  {
    key: `memory_love_croquis`,
    fileUrl: require(`~/assets/memory_love_croquis.png`),
    type: AssetTypes.Texture,
    status: AssetStatus.Queued,
    priority: 15
  },
  {
    key: `memory_anger_croquis`,
    fileUrl: require(`~/assets/memory_anger_croquis.png`),
    type: AssetTypes.Texture,
    status: AssetStatus.Queued,
    priority: 15
  }, 
  {
    key: `memory_sad_croquis`,
    fileUrl: require(`~/assets/memory_sad_croquis.png`),
    type: AssetTypes.Texture,
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
