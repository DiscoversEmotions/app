import _ from 'lodash';

export function pushMessage ({ state, input, controller }) {
  return new Promise(function(resolve, reject) {
    state.set(`system.readyForNextMessage`, false);
    if (input.clean === true) {
      state.set(`system.messages`, []);
    }
    const time = input.time || 300;
    setTimeout(() => {
      var messages = state.get(`system.messages`).slice();
      if (_.isArray(input.message)) {
        messages.push(...input.message);
      } else {
        messages.push(input.message);
      }
      state.set(`system.messages`, messages);
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
    const messages = state.get(`system.messages`);
    const message = _.findLast(messages, (msg) => msg.key === messageKey);
    if (message !== undefined) {
      const id = messages.indexOf(message);
      state.merge(`system.messages.${id}`, input.message);
    } else {
      console.error(`No message for '${messageKey}' in messages`);
    }
    setTimeout(() => {
      state.set(`system.readyForNextMessage`, true);
      resolve();
    }, time);
  });
}
