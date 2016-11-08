import _ from 'lodash';

export class StateManager {

  constructor(initialState) {
    this.state = initialState;

    // bind
    this.updateState = this.updateState.bind(this);
  }

  updateState(updater) {
    this.state = updater(this.state);
  }

}
