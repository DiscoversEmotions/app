export function setForward (enabled) {
  return (state) => {
    return state.setIn([`movement`, `forward`], enabled);
  };
}

export function setBackward (enabled) {
  return (state) => {
    return state.setIn([`movement`, `backward`], enabled);
  };
}

export function setLeft (enabled) {
  return (state) => {
    return state.setIn([`movement`, `left`], enabled);
  };
}

export function setRight (enabled) {
  return (state) => {
    return state.setIn([`movement`, `right`], enabled);
  };
}

export function setPointerLock (enabled) {
  return (state) => {
    return state.setIn([`movement`, `pointerLocked`], enabled);
  };
}
