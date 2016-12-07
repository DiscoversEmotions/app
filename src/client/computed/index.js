import { Computed } from 'cerebral';
import { AssetStatus, Scenes, Steps } from '~/types';
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

export const roomAssetsReady = Computed(
  {
    room: `assets.room.status`,
    webglReady: `app.bundlesReady.webgl`
  },
  ({ room, webglReady }) => {
    return (room === AssetStatus.Ready && webglReady);
  }
);

export const canStartRoom = Computed(
  {
    roomAssetsReady: roomAssetsReady,
    step: `app.step`
  },
  ({ roomAssetsReady, step }) => {
    return (roomAssetsReady && step === Steps.Room);
  }
);

export const mind1AssetsReady = Computed(
  {
    perso: `assets.perso.status`,
    world1: `assets.world1.status`,
    world2: `assets.world2.status`,
    world3: `assets.world3.status`,
    memory_love: `assets.memory_love.status`,
    memory_anger: `assets.memory_love.status`,
    memory_sadness: `assets.memory_love.status`
  },
  ({ perso, world1, world2, world3, memory_love, memory_anger, memory_sadness }) => {
    return (
      perso == AssetStatus.Ready &&
      world1 == AssetStatus.Ready &&
      world2 == AssetStatus.Ready &&
      world3 == AssetStatus.Ready &&
      memory_love == AssetStatus.Ready &&
      memory_anger == AssetStatus.Ready &&
      memory_sadness == AssetStatus.Ready
    );
  }
);

export const shouldBePointerLocked = Computed(
  {
    currentSceneName: `app.scene.current`
  },
  ({ currentSceneName }) => {
    // return (
    //   currentSceneName === Scenes.Emotion ||
    //   currentSceneName === Scenes.Memory
    // );
    return true;
  }
);

export const waitForKeyPress = Computed(
  {
    step: `app.step`,
    lastMessage: lastMessage
  },
  ({ step, lastMessage }) => {
    if (lastMessage && lastMessage.key === `need-recovery` && step === Steps.Room) {
      return `enter`;
    }
    if (lastMessage && lastMessage.key === `linked-memory` && step === Steps.EmotionRecovered) {
      return `enter`;
    }
    return null;
  }
);

export const expectedScene = Computed(
  {
    step: `app.step`,
    assetsReady: mind1AssetsReady,
    webglReady: `app.bundlesReady.webgl`
  },
  ({ step, assetsReady, webglReady }) => {
    switch (step) {
    case Steps.Boot:
      return Scenes.Boot;
    case Steps.Room:
    case Steps.RecoveryDone:
    case Steps.ConfirmKeep:
    case Steps.Delete:
    case Steps.Keep:
    case Steps.Shutdown:
      return Scenes.Room;
    case Steps.EmotionExplain:
    case Steps.EmotionRecovered:
      return Scenes.Emotion;
    case Steps.Memory:
    case Steps.MemoryDone:
      return Scenes.Memory;
    default:
      throw new Error(`No scene for ${step}`);
    }
  }
);
