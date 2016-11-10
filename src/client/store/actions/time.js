
export function set(stepName, time) {
  return (state) => {
    return state.setIn([`time`, stepName], time);
  };
}

export function setCurrent(time) {
  return (state) => {
    return state.set(`currentTime`, time);
  };
}
