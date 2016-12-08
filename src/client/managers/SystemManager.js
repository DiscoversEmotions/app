import { ConnectFunction, ConnectMethod } from '~/core';
import { lastMessage, roomAssetsReady, mind1AssetsReady } from '~/computed';
import { Steps, NUMBER_OF_MEMORIES, NUMBER_OF_EMOTIONS } from '~/types';
import * as motion from 'popmotion';

export class SystemManager {

  constructor(controller) {
    this.controller = controller;
  }

  boot() {
    this.update({}, this.controller, this);
    this.update({});
  }

  @ConnectMethod(
    {
      step: `app.step`,
      readyForNextMessage: `system.readyForNextMessage`,
      findErrorDone: `system.findErrorDone`,
      messages: `system.messages`,
      keys: `keyboard.keys`,
      lastMessage: lastMessage,
      roomAssetsReady: roomAssetsReady,
      mind1AssetsReady: mind1AssetsReady,
      level: `app.level`
    },
    {
      pushMessage: `system.pushMessage`,
      updateLastMessage: `system.updateLastMessage`,
      setNextStep: `app.setNextStep`,
      reboot: `app.reboot`,
      setStep: `app.setStep`
    }
  )
  update(context) {

    context.nextMessage = (message, time, clean = false) => pushMessage({ message: message, time: time, clean: clean });
    context.updateMessage = (key, message, time = 300) => updateLastMessage({ message: message, time: time, key: key });
    context.ignoreEnter = this.controller.getState(`keyboard.ignoreEnter`);

    const {
      readyForNextMessage, lastMessage, pushMessage, updateLastMessage,
      mind1AssetsReady, messages, step
    } = context;

    if (readyForNextMessage === false) {
      return;
    }

    switch (step) {
    case Steps.Boot: return this.updateBoot(context);
    case Steps.Room: return this.updateRoom(context);
    case Steps.EmotionExplain: return this.updateEmotionExplain(context);
    case Steps.EmotionAlmostRecovered: return this.updateEmotionAlmostRecovered(context);
    case Steps.Memory: return this.updateMemory(context);
    case Steps.MemoryDone: return this.updateMemoryDone(context);
    case Steps.RecoveryDone: return this.updateRecoveryDone(context);
    case Steps.ConfirmKeep: return this.updateConfirmKeep(context);
    case Steps.Delete: return this.updateDelete(context);
    case Steps.Shutdown: return this.updateShutdown(context);
    case Steps.Keep: return this.updateKeep(context);
    }

  }

  updateBoot(context) {

    const { pushMessage, updateLastMessage, lastMessage, setNextStep, roomAssetsReady, nextMessage, updateMessage } = context;

    if (lastMessage === null) {
      nextMessage({ key: `boot` }, 200);
      return;
    }

    if (lastMessage === null) {
      return;
    }

    if (lastMessage.key === `boot`) {
      nextMessage({ key: `boot-progress`, progress: 0 }, 200);
      return;
    }

    if (lastMessage.key === `boot-progress`) {
      if (lastMessage.progress < 100) {
        var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(4, 21));
        if (nextProgress > 100) {
          nextProgress = 100;
        }
        var time = Math.floor(motion.calc.random(200, 500));
        if (roomAssetsReady) {
          time = 50;
        }
        updateMessage(`boot-progress`, { progress: nextProgress }, time);
      } else {
        nextMessage({ key: `connect-eyes` }, 100);
      }
      return;
    }

    if (lastMessage.key === `connect-eyes`) {
      nextMessage({ key: `connect-eyes-progress`, progress: 0 }, 500);
      return;
    }

    if (lastMessage.key === `connect-eyes-progress`) {
      if (lastMessage.progress < 100) {
        var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(2, 14));
        var time = Math.floor(motion.calc.random(50, 200));
        if (!roomAssetsReady) {
          nextProgress = lastMessage.progress + 1;
          time = 300 + Math.pow(1.068, lastMessage.progress);
        }
        if (nextProgress > 100) {
          nextProgress = 100;
        }
        updateMessage(`connect-eyes-progress`, { progress: nextProgress }, time);
      } else {
        setNextStep();
      }
      return;
    }
  }

  updateRoom(context) {

    const { pushMessage, updateLastMessage, lastMessage, setNextStep, mind1AssetsReady, nextMessage, updateMessage, keys, ignoreEnter } = context;

    if (lastMessage === null) {
      return;
    }

    if (lastMessage.key === `connect-eyes-progress`) {
      nextMessage({ key: `load-memory-progress`, progress: 0 }, 100);
      return;
    }

    if (lastMessage.key === `load-memory-progress`) {
      if (lastMessage.progress < NUMBER_OF_MEMORIES) {
        var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(10, 34));
        var time = Math.floor(motion.calc.random(50, 200));
        if (nextProgress > NUMBER_OF_MEMORIES) {
          nextProgress = NUMBER_OF_MEMORIES;
        }
        if (!mind1AssetsReady) {
          if (nextProgress > NUMBER_OF_MEMORIES - 1) {
            nextProgress = NUMBER_OF_MEMORIES - 1;
          }
          if (lastMessage.progress > NUMBER_OF_MEMORIES * 0.5) {
            nextProgress = lastMessage.progress + Math.floor(motion.calc.random(4, 15));
            time = Math.floor(motion.calc.random(100, 400));
          }
          if (lastMessage.progress > NUMBER_OF_MEMORIES * 0.7) {
            nextProgress = lastMessage.progress + 1;
            time = Math.floor(motion.calc.random(400, 700));
          }
        }
        updateMessage(`load-memory-progress`, { progress: nextProgress }, time);
      } else {
        nextMessage({ key: `load-emotions-progress`, progress: 0 }, 100);
      }
      return;
    }

    if (lastMessage.key === `load-emotions-progress`) {
      if (lastMessage.progress < NUMBER_OF_EMOTIONS) {
        var nextProgress = lastMessage.progress + 1;
        var time = Math.floor(motion.calc.random(50, 200));
        if (nextProgress > NUMBER_OF_MEMORIES) {
          nextProgress = NUMBER_OF_MEMORIES;
        }
        updateMessage(`load-emotions-progress`, { progress: nextProgress }, time);
      } else {
        nextMessage({ key: `need-recovery` }, 300);
      }
      return;
    }

    if (lastMessage.key === `need-recovery` && keys.enter && !ignoreEnter) {
      setNextStep();
    }

  }

  updateEmotionExplain(context) {

    const { lastMessage, nextMessage, updateMessage, level } = context;

    if (lastMessage === null) {
      return;
    }

    if (lastMessage.key === `emotion-recovered`) {
      nextMessage({ key: `find-tiles` }, 1000, true);
    }

    if (lastMessage.key === `need-recovery`) {
      nextMessage({ key: `find-tiles` }, 1000, true);
      return;
    }

    if (lastMessage.key === `find-tiles`) {
      nextMessage({ key: `use-arrow-to-move` }, 500);
      return;
    }

  }

  updateEmotionAlmostRecovered(context) {

    const { lastMessage, nextMessage, updateMessage, level, keys, setNextStep, ignoreEnter } = context;

    if (lastMessage === null) {
      return;
    }

    if (lastMessage.key === `use-arrow-to-move`) {
      nextMessage({ key: `emotion-almost-recovered`, level: level }, 300);
      return;
    }

    if (lastMessage.key === `emotion-almost-recovered`) {
      nextMessage({ key: `linked-memory`, level: level }, 300);
      return;
    }

    if (lastMessage.key === `linked-memory` && keys.enter && !ignoreEnter) {
      setNextStep();
      return;
    }

  }

  updateMemory(context) {

    const { lastMessage, nextMessage, updateMessage, level, keys, setNextStep, ignoreEnter } = context;

    if (lastMessage.key === `linked-memory`) {
      nextMessage({ key: `now-playing-memory`, level: level }, 50, true);
      return;
    }

    if (lastMessage.key === `now-playing-memory` && keys.enter && !ignoreEnter) {
      setNextStep();
      return;
    }

  }

  updateMemoryDone(context) {

    const { lastMessage, nextMessage, updateMessage, setNextStep, level, keys, ignoreEnter } = context;

    if (lastMessage.key === `now-playing-memory`) {
      nextMessage({ key: `emotion-recovered`, level: level }, 100);
      return;
    }

    if (lastMessage.key === `emotion-recovered` && keys.enter && !ignoreEnter) {
      setNextStep();
      return;
    }

  }

  updateRecoveryDone(context) {
    const { lastMessage, nextMessage, updateMessage, setStep, keys, ignoreEnter } = context;

    if (lastMessage.key === `emotion-recovered`) {
      nextMessage({ key: `all-emotions-recovered` }, 500, true);
      return;
    }

    if (lastMessage.key === `all-emotions-recovered`) {
      nextMessage({ key: `new-memories-found`, progress: 0 }, 300);
      return;
    }

    if (lastMessage.key === `new-memories-found`) {
      if (lastMessage.progress < 3) {
        updateMessage(`new-memories-found`, { progress: lastMessage.progress + 1 }, 1000);
      } else {
        nextMessage({ key: `delete-or-not` }, 300);
      }
      return;
    }

    if (lastMessage.key === `delete-or-not`) {
      if (keys.enter && !ignoreEnter) {
        setStep({ step: Steps.Delete });
      }
      if (keys.n) {
        setStep({ step: Steps.ConfirmKeep });
      }
      return;
    }

  }

  updateConfirmKeep(context) {
    const { lastMessage, nextMessage, setStep, keys, ignoreEnter } = context;

    if (lastMessage.key === `delete-or-not`) {
      nextMessage({ key: `are-you-sure` }, 300);
      return;
    }

    if (lastMessage.key === `are-you-sure`) {
      if (keys.enter && !ignoreEnter) {
        setStep({ step: Steps.Delete });
      }
      if (keys.y) {
        setStep({ step: Steps.Keep });
      }
      return;
    }
  }

  updateDelete(context) {
    const { lastMessage, nextMessage, updateMessage, reboot, keys, setNextStep, setStep, ignoreEnter } = context;

    if (lastMessage.key === `delete-or-not` || lastMessage.key === `are-you-sure`) {
      nextMessage({ key: `delete-memories`, progress: 0 }, 300);
      return;
    }

    if (lastMessage.key === `delete-memories`) {
      if (lastMessage.progress < 10) {
        updateMessage(`delete-memories`, { progress: lastMessage.progress + 1 }, 300);
      } else {
        nextMessage({ key: `need-reboot` }, 300);
      }
      return;
    }

    if (lastMessage.key === `need-reboot`) {
      if (keys.enter && !ignoreEnter) {
        setStep({ step: Steps.Shutdown });
      }
      return;
    }

  }

  updateShutdown(context) {
    const { lastMessage, nextMessage, updateMessage, reboot } = context;

    if (lastMessage.key === `need-reboot`) {
      nextMessage({ key: `shutdown` }, 1000);
      return;
    }

    if (lastMessage.key === `shutdown`) {
      reboot();
      return;
    }

  }

  updateKeep(context) {
    const { lastMessage, nextMessage, updateMessage, reboot, setStep } = context;

    if (lastMessage.key === `are-you-sure`) {
      nextMessage({ key: `good-luck` }, 1000);
      return;
    }

    if (lastMessage.key === `good-luck`) {
      setStep({ step: Steps.End });
      return;
    }
  }

}
