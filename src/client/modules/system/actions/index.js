
export function planNextMessage ({ state, input, controller }) {
  return new Promise(function(resolve, reject) {
    const time = input.time || 300;
    setTimeout(() => {
      const messages = state.get(`system.messages`);
      console.log(`TODO`);
      // messages.push(input.message);
      // messages =
      // state.set(`system.messages`, messages);
      resolve();
    }, time);
  });
}
