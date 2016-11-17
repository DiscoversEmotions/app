import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

export function Connect (
  mapState = (store, props) => ({}),
  mapActions = (actions) => ({})
) {
  return (component) => {
    class ConnectedComponent extends Component {
      render () {
        return React.createElement(
          component,
          Object.assign(
            {},
            this.props,
            mapState(this.context.store.state, this.context.store.computedState, this.props),
            _.mapValues(mapActions(this.context.store.actions), (action, key) => (...args) => {
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
