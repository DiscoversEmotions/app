import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lastMessage, roomAssetsReady, world1AssetsReady } from '~/computed';
import * as motion from 'popmotion';

const NUMBER_OF_MEMORIES = 482;
const NUMBER_OF_EMOTIONS = 47;

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
      currentWorld: `app.world`,
      readyForNextMessage: `system.readyForNextMessage`,
      bootDone: `system.bootDone`,
      findErrorDone: `system.findErrorDone`,
      messages: `system.messages`,
      lastMessage: lastMessage,
      roomAssetsReady: roomAssetsReady,
      world1AssetsReady: world1AssetsReady,
    },
    {
      planNextMessage: `system.planNextMessage`,
      updateLastMessage: `system.updateLastMessage`,
      setBootDone: `system.setBootDone`,
      setFindErrorDone: `system.setFindErrorDone`
    }
  )
  update(context) {
    const { readyForNextMessage, bootDone, findErrorDone, currentWorld } = context;
    if (readyForNextMessage === false) {
      return;
    }
    if (bootDone === false) {
      this.updateBoot(context);
      return;
    }
    if (findErrorDone === false) {
      this.udateFindError(context);
      return;
    }
  }

  updateBoot(context) {
    const { lastMessage, planNextMessage, roomAssetsReady, setBootDone, bootDone, updateLastMessage, messages } = context;
    const nextMessage = (message, time = 300) => planNextMessage({ message: message, time: time });
    const updateMessage = (key, message, time = 300) => updateLastMessage({ message: message, time: time, key: key });

    if (lastMessage.key === `boot`) {
      nextMessage({ key: `boot-progress`, progress: 0 }, 200);
      return;
    }

    if (lastMessage.key === `boot-progress`) {
      if (lastMessage.progress === 100) {
        nextMessage({ key: `boot-done` }, 100);
        return;
      }
      var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(4, 21));
      if (nextProgress > 100) {
        nextProgress = 100;
      }
      var time = Math.floor(motion.calc.random(200, 500));
      if (roomAssetsReady) {
        time = 50;
      }
      updateMessage(`boot-progress`, { progress: nextProgress }, time);
    }

    if (lastMessage.key === `boot-done`) {
      nextMessage({ key: `connect-eyes` }, 500);
      return;
    }

    if (lastMessage.key === `connect-eyes`) {
      nextMessage({ key: `connect-eyes-progress`, progress: 0 }, 500);
      return;
    }

    if (lastMessage.key === `connect-eyes-progress`) {
      if (lastMessage.progress === 100) {
        nextMessage({ key: `connect-eyes-done` }, 100);
        setBootDone();
        return;
      }
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
      return;
    }

  }

  udateFindError(context) {
    const { lastMessage, planNextMessage, updateLastMessage, world1AssetsReady, messages, setFindErrorDone } = context;
    const nextMessage = (message, time = 300) => planNextMessage({ message: message, time: time });
    const updateMessage = (key, message, time = 300) => updateLastMessage({ message: message, time: time, key: key });

    if (lastMessage.key === `connect-eyes-done`) {
      nextMessage({ key: `load-memory-progress`, progress: 0 }, 100);
      return;
    }

    if (lastMessage.key === `load-memory-progress`) {
      if (lastMessage.progress === NUMBER_OF_MEMORIES) {
        nextMessage({ key: `load-memory-done` }, 100);
        return;
      }
      var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(10, 34));
      var time = Math.floor(motion.calc.random(50, 200));
      if (nextProgress > NUMBER_OF_MEMORIES) {
        nextProgress = NUMBER_OF_MEMORIES;
      }
      if (!world1AssetsReady) {
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
      return;
    }

    if (lastMessage.key === `load-memory-done`) {
      nextMessage({ key: `load-emotions-progress`, progress: 0 }, 500);
      return;
    }

    if (lastMessage.key === `load-emotions-progress`) {
      if (lastMessage.progress === NUMBER_OF_EMOTIONS) {
        nextMessage({ key: `load-emotions-done` }, 100);
        return;
      }
      var nextProgress = lastMessage.progress + 1;
      var time = Math.floor(motion.calc.random(50, 200));
      if (nextProgress > NUMBER_OF_MEMORIES) {
        nextProgress = NUMBER_OF_MEMORIES;
      }
      if (lastMessage.progress === 10) {
        nextMessage([
          { key: `load-emotions-error` },
          { key: `load-emotions-error-love` },
          { key: `load-emotions-progress`, progress: nextProgress }
        ], time);
      } else if (lastMessage.progress === 15) {
        nextMessage([
          { key: `load-emotions-error` },
          { key: `load-emotions-error-anger` },
          { key: `load-emotions-progress`, progress: nextProgress }
        ], time);
      } else if (lastMessage.progress === 27) {
        nextMessage([
          { key: `load-emotions-error` },
          { key: `load-emotions-error-sadness` },
          { key: `load-emotions-progress`, progress: nextProgress }
        ], time);
      } else {
        updateMessage(`load-emotions-progress`, { progress: nextProgress }, time);
      }
      return;
    }

    if (lastMessage.key === `load-emotions-done`) {
      setFindErrorDone();
    }
  }

  formatMessage(msg) {
    if (msg === undefined) {
      console.log(`return empty`);
      return ``;
    }
    return this.getMessageRenderer(msg)(msg);
  }

  getMessageType(msg) {
    if ([
      `boot-done`,
      `connect-eyes-done`,
      `load-memory-done`
    ].indexOf(msg.key) > -1) {
      return `success`;
    }
    if ([
      `load-emotions-error`,
      `load-emotions-error-love`,
      `load-emotions-error-anger`,
      `load-emotions-error-sadness`,
      `load-emotions-done`
    ].indexOf(msg.key) > -1) {
      return `error`;
    }
    return `normal`;
  }

  getMessageRenderer(msg) {
    switch (msg.key) {
    case `empty`: return (msg) => (``);
    case `boot`: return (msg) => (`Start Booting System`);
    case `boot-progress`: return (msg) => (`Booting System... ${msg.progress} / 100`);
    case `boot-done`: return (msg) => (`System booted`);
    case `connect-eyes`: return (msg) => (`Connecting to the ocular system`);
    case `connect-eyes-progress`: return (msg) => (`Connecting to the ocular system... ${ Math.floor(msg.progress) } / 100`);
    case `connect-eyes-done`: return (msg) => (`Ocular system connected`);
    case `load-memory-progress`: return (msg) => (`Retrieving memories... ${msg.progress} / ${NUMBER_OF_MEMORIES}`);
    case `load-memory-done`: return (msg) => (`${NUMBER_OF_MEMORIES} / ${NUMBER_OF_MEMORIES} memories retrieved - No error`);
    case `load-emotions-progress`: return (msg) => (`Retrieving emotions... ${msg.progress} / ${NUMBER_OF_EMOTIONS}`);
    case `load-emotions-error`: return (msg) => (`Warning: The following emotion is missing :`);
    case `load-emotions-error-love`: return (msg) => (`Love [/system/emotions/love.dg]`);
    case `load-emotions-error-anger`: return (msg) => (`Anger [/system/emotions/anger.dg]`);
    case `load-emotions-error-sadness`: return (msg) => (`Sadness [/system/emotions/sadness.dg]`);
    case `load-emotions-done`: return (msg) => (`${NUMBER_OF_EMOTIONS - 3} / ${NUMBER_OF_EMOTIONS} emotions retrieved - 3 errors`);
    default:
      console.error(new Error(`Message key ${msg.key} ??`));
      throw new Error(`Message key ${msg.key} ??`);
    }
  }

}
