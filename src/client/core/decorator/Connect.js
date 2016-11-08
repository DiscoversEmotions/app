import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

export function Connect (
  selector = (state, props) => ({}),
  actions = {}
) {
  return (component) => {
    class ConnectedComponent extends Component {
      render () {
        return React.createElement(
          component,
          Object.assign(
            {},
            {
              state: this.context.state,
              updateState: this.context.updateState
            },
            this.props,
            selector(this.context.state, this.props),
            _.mapValues(actions, (action) => (...args) => {
              return this.context.updateState(action(...args));
            })
          )
        );
      }
    }
    ConnectedComponent.contextTypes = {
      state: PropTypes.any.isRequired,
      updateState: PropTypes.func.isRequired
    };
    return ConnectedComponent;
  };
}
