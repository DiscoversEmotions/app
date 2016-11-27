import { ConnectFunction, ConnectMethod } from '~/core';
import { Worlds } from '~/types';
import { lastMessage } from '~/computed';

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
      lastMessage: lastMessage
    },
    {

    }
  )
  update({ lastMessage }) {
    console.log(`Update SystemManager : ${ lastMessage }`);
  }

}
