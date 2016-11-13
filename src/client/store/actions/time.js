export function setTime(time) {
  return (state) => {
    return state.set(`time`, time);
  };
}
