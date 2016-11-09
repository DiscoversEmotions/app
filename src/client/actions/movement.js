export function setForward (enabled) {
  return (state) => {
    return state.setIn([`movement`, `forward`], enabled);
  };
}

export function setPointerLock (enabled) {
  return (state) => {
    return state.setIn([`movement`, `pointerLocked`], enabled);
  };
}
