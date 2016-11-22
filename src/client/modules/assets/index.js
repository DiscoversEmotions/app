import {
  state,
  set,
  wait
} from 'cerebral/operators';
import { AssetStatus, AssetTypes } from '~/types';
import signals from './signals';

export default {
  state: {
    perso: {
      key: `perso`,
      fileUrl: require(`~/assets/perso.json`),
      type: AssetTypes.Json,
      status: AssetStatus.Queued,
      size: 298,
      priority: 0,
    },
    room: {
      key: `room`,
      fileUrl: require(`~/assets/room.jpg`),
      type: AssetTypes.Texture,
      status: AssetStatus.Queued,
      size: 566,
      priority: 10,
    }
  },
  signals: signals
};
