import { store } from '~/redux';

export function connect (selector) {
  return function (klass) {
    let oldUpdate = klass.prototype._update;
    function newUpdate (props) {
      let storeProps = store.getState();
      if (selector) {
        storeProps = selector(store.getState(), props);
      }
      oldUpdate.call(this, {
        ...props,
        ...storeProps
      });
    };

    Object.defineProperty(klass.prototype, '_update', {
      value: newUpdate,
      enumerable: false,
      configurable: true,
      writable: true
    });

    return klass;
  };
}
