import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lastMessage, roomAssetsReady } from '~/computed';
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
      lastMessage: lastMessage,
      roomAssetsReady: roomAssetsReady,
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
    const { lastMessage, planNextMessage, readyForNextMessage, roomAssetsReady, setBootDone, bootDone, updateLastMessage } = context;
    const nextMessage = (message, time = 300) => planNextMessage({ message: message, time: time });
    const updateMessage = (message, time = 300) => updateLastMessage({ message: message, time: time });

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
      updateMessage({ progress: nextProgress }, time);
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
      updateMessage({ progress: nextProgress }, time);
      return;
    }

  }

  udateFindError(context) {
    const { lastMessage, planNextMessage, readyForNextMessage, roomAssetsReady, setBootDone, bootDone, updateLastMessage } = context;
    const nextMessage = (message, time = 300) => planNextMessage({ message: message, time: time });
    const updateMessage = (message, time = 300) => updateLastMessage({ message: message, time: time });

    if (lastMessage.key === `connect-eyes-done`) {
      nextMessage({ key: `connect-memory-progress`, progress: 0 }, 100);
      return;
    }

    if (lastMessage.key === `connect-memory-progress`) {
      if (lastMessage.progress === NUMBER_OF_MEMORIES) {
        nextMessage({ key: `connect-memory-done` }, 100);
        return;
      }
      var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(10, 34));
      var time = Math.floor(motion.calc.random(50, 200));
      if (nextProgress > NUMBER_OF_MEMORIES) {
        nextProgress = NUMBER_OF_MEMORIES;
      }
      updateMessage({ progress: nextProgress }, time);
      return;
    }

    if (lastMessage.key === `connect-memory-done`) {
      console.log(`TODO`);
    }

    // if (lastMessage.key === `connect-eyes`) {
    //   nextMessage({ key: `connect-memory`, step: 0 });
    //   return;
    // }
    // if (lastMessage.key === `connect-memory`) {
    //   if (lastMessage.step >= 6) {
    //     return;
    //   }
    //   var nextStep = lastMessage.step + 1;
    //   var time = 1000;
    //   var memories = 1;
    //   var emotions = 1;
    //   if (lastMessage.step === 1) {
    //     time = 100 + Math.random() * 200;
    //     memories = lastMessage.memories + Math.floor(20 + (Math.random() * 30));
    //     nextStep = lastMessage.step;
    //     if (memories >= NUMBER_OF_MEMORIES) {
    //       memories = NUMBER_OF_MEMORIES;
    //       nextStep += 1;
    //     }
    //   }
    //   if (lastMessage.step === 5) {
    //     time = 100 + Math.random() * 200;
    //     emotions = lastMessage.emotions + 1;
    //     nextStep = lastMessage.step;
    //     if (emotions >= NUMBER_OF_EMOTIONS) {
    //       emotions = NUMBER_OF_EMOTIONS;
    //       nextStep += 1;
    //     }
    //   }
    //
    //   const message = { key: `connect-memory`, step: nextStep, memories, emotions };
    //   if (nextStep === lastMessage.step) {
    //     updateMessage(message, time);
    //   } else {
    //     nextMessage(message, time);
    //   }
    //   return;
    // }
  }

  formatMessage(msg) {
    if (msg === undefined) {
      console.log(`return empty`);
      return ``;
    }
    return this.getMessageRenderer(msg)(msg);
  }

  getMessageType(msg) {
    if (msg.key === `connect-memory`) {
      if ([2, 4, 6].indexOf(msg.step) > -1) {
        return `success`;
      }
      if ([].indexOf(msg.step) > -1) {
        return `error`;
      }
    }
    if (
      (msg.key === `boot` || msg.key === `connect-eyes`) &&
      msg.progress >= 100
    ) {
      return `success`;
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
    case `connect-memory-progress`: return (msg) => (`Retrieving memories... ${msg.progress} / ${NUMBER_OF_MEMORIES}`);
    case `connect-memory-done`: return (msg) => (`${NUMBER_OF_MEMORIES} memories retrieved - No error`);
    default:
      console.error(new Error(`Message key ${msg.key} ??`));
      throw new Error(`Message key ${msg.key} ??`);
    }
  }

  connectMemoryRenderer(msg) {
    if (msg.step === 1) {
      return `Retrieving memories... ${msg.memories} / ${NUMBER_OF_MEMORIES}`;
    }
    if (msg.step === 5) {
      return `Retrieving emotions... ${msg.emotions} / ${NUMBER_OF_EMOTIONS}`;
    }
    switch (msg.step) {
    case 0: return `Connecting to memory...`;
    // case 1:
    case 2: return `Retrieving memories... OK`;
    case 3: return `Updating analysis rules...`;
    case 4: return `Analysis rules are up to date`;
    // case 5: return `Retrieving emotions... 1/47`;
    case 6: return `Retrieving emotions... OK`;
    default:
      return ``;
    }

  }

}
