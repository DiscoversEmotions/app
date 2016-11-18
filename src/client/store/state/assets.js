import { AssetTypes, AssetStatus } from '~/types';

export const assets = {
  world_1: {
    key: `world_1`,
    get: require(`~/assets/plane.obj`),
    type: AssetTypes.Obj,
    status: AssetStatus.Queued,
    size: 298,
    priority: 0,
  },
  room: {
    key: `room`,
    get: require(`~/assets/room.jpg`),
    type: AssetTypes.Texture,
    status: AssetStatus.Queued,
    size: 566,
    priority: 10,
  }
};
