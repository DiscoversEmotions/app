
export function planNextMessage ({ state, input, controller }) {
  state.set(`system.readyForNextMessage`, false);
  return new Promise(function(resolve, reject) {
    const time = input.time || 300;
    setTimeout(() => {
      const messages = state.get(`system.messages`).slice();
      messages.push(input.message);
      state.set(`system.messages`, messages.slice(-8));
      state.set(`system.readyForNextMessage`, true);
      resolve();
    }, time);
  });
}
