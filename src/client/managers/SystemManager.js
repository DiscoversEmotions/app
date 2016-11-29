import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lastMessage, roomAssetsReady } from '~/computed';
import { MessagesFormatter } from './MessagesFormatter';
import * as motion from 'popmotion';

export class SystemManager {

  constructor(controller) {
    this.controller = controller;
    this.messagesFormatter = new MessagesFormatter(this.controller);
  }

  boot() {
    this.update({}, this.controller, this);
    this.update({});
  }

  @ConnectMethod(
    {
      lastMessage: lastMessage,
      readyForNextMessage: `system.readyForNextMessage`,
      speed: roomAssetsReady
    },
    {
      planNextMessage: `system.planNextMessage`,
      setBootDone: `system.setBootDone`
    }
  )
  update({ lastMessage, planNextMessage, readyForNextMessage, speed, setBootDone }) {
    if (readyForNextMessage === false) {
      return;
    }
    const nextMessage = (message, time = 300) => planNextMessage({ message: message, time: time });

    console.log(`Update SystemManager : ${lastMessage.key}`);
    if (lastMessage.key === `boot`) {
      if (lastMessage.progress < 100) {
        var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(4, 21));
        var time = Math.floor(motion.calc.random(200, 500));
        if (speed) {
          time = 50;
        }
        if (nextProgress > 100) {
          nextProgress = 100;
        }
        nextMessage({ key: `boot`, progress: nextProgress }, time);
      } else {
        nextMessage({ key: `connect-eyes`, progress: 0 }, 1000);
      }
      return;
    }
    if (lastMessage.key === `connect-eyes`) {
      if (lastMessage.progress < 80) {
        var nextProgress = lastMessage.progress + Math.floor(motion.calc.random(2, 14));
        var time = Math.floor(motion.calc.random(200, 500));
        if (speed) {
          time = 50;
        }
        nextMessage({ key: `connect-eyes`, progress: nextProgress }, time);
      } else if (lastMessage.progress < 99) {
        var time = Math.floor(((Math.pow(1.154, (lastMessage.progress - 82))) - 0.6) * 200);
        var nextProgress = lastMessage.progress + 1;
        if (speed) {
          time = 100;
          nextProgress = lastMessage.progress + Math.floor(motion.calc.random(4, 21));
          if (nextProgress > 99) {
            nextProgress = 99;
          }
        }
        nextMessage({ key: `connect-eyes`, progress: nextProgress }, time);
      } else {
        if (lastMessage.progress < 100 && speed) {
          nextMessage({ key: `connect-eyes`, progress: 100 }, 100);
          setBootDone();
        }
        return;
      }
      return;
    }
    console.error(new Error(`Unknow message key : ${lastMessage.key}`));
  }

  formatMessage(msg) {
    return this.messagesFormatter.formatMessage(msg);
  }

}
