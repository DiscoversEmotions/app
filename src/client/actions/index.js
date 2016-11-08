export function switchColor () {
  return (state) => {
    if (state.get(`color`) === `red`) {
      return state.set(`color`, `blue`);
    }
    return state.set(`color`, `red`);
  };
}

export function setWorld (world) {
  return (state) => {
    return state.set(`world`, world);
  };
}
