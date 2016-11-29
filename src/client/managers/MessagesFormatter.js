
export class MessagesFormatter {
  constructor(controller) {
    this.controller = controller;
  }

  formatMessage(msg) {
    if (msg === undefined) {
      console.log(`return empty`);
      return ``;
    }
    return this.getMessageRenderer(msg)(msg);
  }

  getMessageRenderer(msg) {
    switch (msg.key) {
    case `boot`: return (msg) => {
      if (msg.progress < 100) {
        return `Booting System... ${msg.progress} / 100`;
      }
      return `Booting System... OK`;
    };
    case `connect-eyes`: return (msg) => {
      if (msg.progress < 100) {
        return `Connecting to the ocular system... ${ Math.floor(msg.progress) } / 100`;
      }
      return `Connecting to the ocular system... OK`;
    };
    default:
      console.error(new Error(`Message key ${msg.key} ??`));
      throw new Error(`Message key ${msg.key} ??`);
    }
  }

}
