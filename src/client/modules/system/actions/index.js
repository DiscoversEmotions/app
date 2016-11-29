import _ from 'lodash';

export function planNextMessage ({ state, input, controller }) {
  state.set(`system.readyForNextMessage`, false);
  return new Promise(function(resolve, reject) {
    const time = input.time || 300;
    setTimeout(() => {
      const messages = state.get(`system.messages`).slice();
      if (_.isArray(input.message)) {
        messages.push(...input.message);
      } else {
        messages.push(input.message);
      }
      state.set(`system.messages`, messages.slice(-100));
      state.set(`system.readyForNextMessage`, true);
      resolve();
    }, time);
  });
}

export function updateLastMessage ({ state, input, controller }) {
  state.set(`system.readyForNextMessage`, false);
  return new Promise(function(resolve, reject) {
    const time = input.time || 300;
    const messageKey = input.key;
    if (messageKey === undefined) {
      console.error(new Error(`Need Key !`));
    }
    setTimeout(() => {
      const messages = state.get(`system.messages`);
      const message = _.findLast(messages, (msg) => msg.key === messageKey);
      if (messages !== undefined) {
        const id = messages.indexOf(message);
        state.merge(`system.messages.${id}`, input.message);
        state.set(`system.readyForNextMessage`, true);
      } else {
        console.log(`No message for '${messageKey}' in messages`);
      }
      resolve();
    }, time);
  });
}
