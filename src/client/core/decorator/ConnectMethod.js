import { ConnectFunction } from './ConnectFunction';

export function ConnectMethod (...args) {
  var connectArgs = args;
  return function ConnectMethodDecorator(target, name, descriptor, context) {
    var connectedComponent = null;
    const method = descriptor.value;
    return {
      ...descriptor,
      value: (props, controller, context) => {
        if (connectedComponent === null) {
          if (controller === undefined || context === undefined) {
            throw new Error(`Need controller and context for the first update !\nDid you call the method with (props, controller, context) ?`);
          }
          connectedComponent = ConnectFunction(controller, ...connectArgs)(method.bind(context));
        } else if (controller !== undefined || context !== undefined) {
          console.warn(`Method already connected, controller and context are ignored`);
        }
        connectedComponent.update(props);
      }
    };
  };
}
