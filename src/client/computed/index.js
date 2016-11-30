import { Computed } from 'cerebral';
import { AssetStatus, Scenes } from '~/types';
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

export const nextQueuedAsset = Computed(
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

export const roomAssetsReady = Computed(
  {
    room: `assets.room.status`,
    webglReady: `app.webglReady`
  },
  ({ room, webglReady }) => {
    return (room === AssetStatus.Ready && webglReady);
  }
);

export const canStartRoom = Computed(
  {
    roomAssetsReady: roomAssetsReady,
    bootDone: `system.bootDone`
  },
  ({ roomAssetsReady, bootDone }) => {
    return (roomAssetsReady && bootDone);
  }
);

export const mind1AssetsReady = Computed(
  {
    perso: `assets.perso.status`,
    world1: `assets.world1.status`,
    world2: `assets.world2.status`,
    world3: `assets.world3.status`,
    memory1: `assets.memory1.status`
  },
  ({ perso, world1, world2, world3, memory1 }) => {
    return (
      perso == AssetStatus.Ready &&
      world1 == AssetStatus.Ready &&
      world2 == AssetStatus.Ready &&
      world3 == AssetStatus.Ready &&
      memory1 == AssetStatus.Ready
    );
  }
);

export const showModal = Computed(
  {
    currentSceneName: `app.currentSceneName`,
    findErrorDone: `system.findErrorDone`
  },
  ({ currentSceneName, findErrorDone }) => {
    return (
      currentSceneName === Scenes.Room &&
      findErrorDone
    );
  }
);

export const shouldBePointerLocked = Computed(
  {
    currentSceneName: `app.currentSceneName`
  },
  ({ currentSceneName }) => {
    return (
      currentSceneName === Scenes.Mind ||
      currentSceneName === Scenes.Memory
    );
  }
);
