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
            this.props,
            selector(this.context.store.get(), this.props),
            _.mapValues(actions, (action) => (...args) => {
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
