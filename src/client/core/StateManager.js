import _ from 'lodash';

// class Step {
//   start(state, updateState, time: num | false, dt) -> void
//   update(state, updateState, time: num | false, dt) -> (newStep: string) | null
//   stop(state, updateState, time: num | false, dt) -> void
// }

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
