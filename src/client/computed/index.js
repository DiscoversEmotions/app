import { Computed } from 'cerebral';
import { AssetStatus } from '~/types';
import _ from 'lodash';

export const requestedAssets = Computed(
  {
    assets: `assets`
  },
  ({assets}) => _(assets).filter((asset) => (asset.status === AssetStatus.Requested)).value()
);

export const queuedAssets = Computed(
  {
    assets: `assets`
  },
  ({assets}) => _(assets).filter((asset) => (asset.status === AssetStatus.Queued)).value()
);

export const nextRequestedAsset = Computed(
  {
    queued: queuedAssets
  },
  ({queued}) => {
    const queuedByPriority = _(queued).sortBy(`priority`).value();
    if (queuedByPriority.length > 0) {
      return _.head(queuedByPriority);
    }
    return null;
  }
);

export const lvl1AssetsReady = Computed(
  {
    world2: `assets.world2.status`,
    perso: `assets.perso.status`
  },
  ({ world2, perso }) => {
    if (world2 === AssetStatus.Ready && perso === AssetStatus.Ready) {
      return true;
    }
    return false;
  }
);

export const memory1AssetsReady = Computed(
  {
    memory1: `assets.memory1.status`
  },
  ({ memory1 }) => {
    if (memory1 === AssetStatus.Ready) {
      return true;
    }
    return false;
  }
);

export const lastMessage = Computed(
  {
    messages: `system.messages`
  },
  ({ messages }) => {
    if (messages.length === 0) {
      return null;
    }
    return _.last(messages);
  }
);

export const allMessages = Computed(
  {
    messages: `system.messages`
  },
  ({ messages }) => {
    return messages;
  }
);
