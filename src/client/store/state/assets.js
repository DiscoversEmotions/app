import { AssetTypes, AssetStatus } from '~/types';

export const assets = {
  world_1: { key: `world_1`, get: require(`~/assets/plane.obj`), type: AssetTypes.Obj, status: AssetStatus.Queued },
  room: { key: `room`, get: require(`~/assets/room.jpg`), type: AssetTypes.Image, status: AssetStatus.Queued }
};
