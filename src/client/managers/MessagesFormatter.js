export class MessagesFormatter {
  constructor(controller) {
    this.controller = controller;
  }

  formatMessage(msg) {
    if (msg === undefined) {
      console.log(`return empty`);
      return ``;
    }
    switch (msg.key) {
    case `boot`:
      return `Booting System...`;
      break;
    case `yolo`:
      return `Yolo...`;
      break;
    default:
      console.error(new Error(`Message key ${msg.key} ??`));
      throw new Error(`Message key ${msg.key} ??`);
    }
  }

}
