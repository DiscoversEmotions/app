import _ from 'lodash';
import { Map } from 'immutable';

export class Store {

  constructor(state, computedState) {
    this.state = state;
    this.computedState = computedState;

    this.lastState = null;
    this.listeners = [];

    // bind
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(updater) {
    this.lastState = this.state;
    this.state = updater(this.state);
    if (this.state !== this.lastState) {
      this.updateComputedState();
    }
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  }

  hasChangedIn(path) {
    return this.state.getIn(path) !== this.lastState.getIn(path);
  }

  hasChanged(key) {
    return this.state.get(key) !== this.lastState.get(key);
  }

  onStateUpdate(cb) {
    this.listeners.push(cb);
  }

  updateComputedState() {}

  get(key) {
    if (key === undefined) {
      return this.state;
    }
    return this.state.get(key);
  }

  getIn(path) {
    return this.state.getIn(path);
  }

  getComputed(key) {
    if (key === undefined) {
      return this.computedState;
    }
    return this.computedState.get(key);
  }

  getComputedIn(path) {
    return this.computedState.getIn(path);
  }

}
