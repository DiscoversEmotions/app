import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lastMessage } from '~/computed';
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
      lastMessage: lastMessage
    },
    {
      planNextMessage: `system.planNextMessage`
    }
  )
  update({ lastMessage, planNextMessage }) {
    console.log(`Update SystemManager : ${lastMessage.key}`);
    switch (lastMessage.key) {
    case `boot`:
      console.log(`send yolo message`);
      planNextMessage({
        message: {
          key: `yolo`,
          progress: 0
        }
      });
      break;
    case `yolo`:
      planNextMessage({
        message: {
          key: `yolo`,
          progress: lastMessage.progress + motion.calc.random(12, 56)
        },
        time: 1000
      });
      break;
    default:
      console.error(new Error(`Unknow message key : ${lastMessage.key}`));
      throw new Error(`Unknow message key : ${lastMessage.key}`);
    }
  }

  formatMessage(msg) {
    return this.messagesFormatter.formatMessage(msg);
  }

}
