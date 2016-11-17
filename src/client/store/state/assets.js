import { AssetTypes } from '~/types';

export const assets = [
  { key: `world_1`, get: require(`~/assets/plane.obj`), type: AssetTypes.Obj },
  { key: `room`, get: require(`~/assets/room.jpg`), type: AssetTypes.Image }
];
