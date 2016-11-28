import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lastMessage } from '~/computed';
import { MessagesManager } from './MessagesManager';
import * as motion from 'popmotion';

export class SystemManager {

  constructor(controller) {
    this.controller = controller;
    this.messagesManager = new MessagesManager(this.controller);
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
    switch (lastMessage.key) {
    case `boot`:
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
      throw new Error(`Unknow message key : ${lastMessage.key}`);
    }
  }

}
