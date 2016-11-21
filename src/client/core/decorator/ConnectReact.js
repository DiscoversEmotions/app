import { connect } from 'cerebral/react';

export function ConnectReact (...args) {
  return (component) => {
    return connect(...args, component);
  };
}
