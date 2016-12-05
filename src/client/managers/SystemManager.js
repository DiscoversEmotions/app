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
      lastMessage: lastMessage,
      roomAssetsReady: roomAssetsReady,
      mind1AssetsReady: mind1AssetsReady,
    },
    {
      pushMessageAndWait: `system.pushMessageAndWait`,
      updateLastMessage: `system.updateLastMessage`,
      setNextStep: `app.setNextStep`
    }
  )
  update(context) {

    context.nextMessage = (message, time) => pushMessageAndWait({ message: message, time: time });
    context.updateMessage = (key, message, time = 300) => updateLastMessage({ message: message, time: time, key: key });

    const {
      readyForNextMessage, lastMessage, pushMessageAndWait, updateLastMessage,
      mind1AssetsReady, messages, step
    } = context;


    if (readyForNextMessage === false) {
      return;
    }

    switch (step) {
    case Steps.Boot: return this.updateBoot(context);
    case Steps.Room: return this.updateRoom(context);

    case Steps.EmotionExplain: return this.updateEmotionExplain(context);
    case Steps.EmotionRecovered: return this.updateEmotionRecovered(context);
    case Steps.Memory: return this.updateMemory(context);
    case Steps.MemoryDone: return this.updateMemoryDone(context);
    }

  }

  updateBoot(context) {

    const { pushMessageAndWait, updateLastMessage, lastMessage, setNextStep, roomAssetsReady, nextMessage, updateMessage } = context;

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

    const { pushMessageAndWait, updateLastMessage, lastMessage, setNextStep, mind1AssetsReady, nextMessage, updateMessage } = context;

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
        nextMessage({ key: `need-recovery` }, 200);
      }
      return;
    }

  }

  updateEmotionExplain(context) {

    const { lastMessage, nextMessage, updateMessage } = context;

    if (lastMessage.key === `need-recovery` || lastMessage.key === `playing-memory-done`) {
      nextMessage({ key: `find-tiles` }, 300);
    }

    if (lastMessage.key === `find-tiles`) {
      nextMessage({ key: `use-arrow-to-move` }, 500);
    }

  }

  updateEmotionRecovered(context) {

    const { lastMessage, nextMessage, updateMessage } = context;

    if (lastMessage.key === `use-arrow-to-move`) {
      nextMessage({ key: `emotion-recovered` }, 300);
    }

    if (lastMessage.key === `emotion-recovered`) {
      nextMessage({ key: `linked-memory` }, 300);
    }

  }

  updateMemory(context) {

    const { lastMessage, nextMessage, updateMessage } = context;

    if (lastMessage.key === `linked-memory`) {
      nextMessage({ key: `now-playing-memory` }, 50);
    }

  }

  updateMemoryDone(context) {

    const { lastMessage, nextMessage, updateMessage, setNextStep } = context;

    if (lastMessage.key === `now-playing-memory`) {
      nextMessage({ key: `playing-memory-done` }, 300);
    }

    if (lastMessage.key === `playing-memory-done`) {
      setNextStep();
    }

  }

  getMessageHeight(msg) {
    if (msg.type === `console`) {
      return 26;
    }
    return 40;
  }

  getMessageType(msg) {
    if (_.includes([
      `boot`, `boot-progress`, `boot-done`, `connect-eyes`, `connect-eyes-progress`, `connect-eyes-done`
    ], msg.key)) {
      return `console`;
    }
    return `simple`;
  }

}
