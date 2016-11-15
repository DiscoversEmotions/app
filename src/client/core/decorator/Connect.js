import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

export function Connect (
  selector = (store, props) => ({}),
  actions = {}
) {
  return (component) => {
    class ConnectedComponent extends Component {
      render () {
        return React.createElement(
          component,
          Object.assign(
            {},
            this.props,
            selector(this.context.store.state, this.context.store.computedState, this.props),
            _.mapValues(actions, (action, key) => (...args) => {
              if (!_.isFunction(action)) {
                throw new Error(`Action for key ${key} is not a function !`);
              }
              return this.context.store.dispatch(action(...args));
            })
          )
        );
      }
    }
    ConnectedComponent.contextTypes = {
      store: PropTypes.any.isRequired,
    };
    return ConnectedComponent;
  };
}
