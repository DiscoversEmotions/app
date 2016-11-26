import { Computed as ComputedFactory } from 'cerebral';

const Computed = ComputedFactory({}, () => null).constructor;

/**
 * Utils
 */

function cleanPath (path) {
  return path.replace(/\.\*\*|\.\*/, ``);
}

function propsDiffer (propsA, propsB) {
  const propsAKeys = Object.keys(propsA);
  const propsBKeys = Object.keys(propsB);
  let isDifferent = false;
  if (propsAKeys.length !== propsBKeys.length) {
    isDifferent = true;
  } else {
    for (let i = 0; i < propsBKeys.length; i++) {
      if (propsA[propsBKeys[i]] !== propsB[propsBKeys[i]]) {
        isDifferent = true;
        break;
      }
    }
  }
  return isDifferent;
}

/**
 * HOC
 */

function HOC(controller, paths, signals, injectedProps, Component) {
  class CerebralComponent {

    static getStatePaths(props) {
      if (!paths) {
        return {};
      }
      return typeof paths === `function` ? paths(props) : paths;
    }

    constructor() {
      this.render = this.render.bind(this);
      this.mounted = false;
    }

    initialize(props) {
      this.controller = controller;
      this.componentDependencyStore = controller.componentDependencyStore;
      this.evaluatedPaths = CerebralComponent.getStatePaths(props);
      this.signals = signals;
      this.injectedProps = injectedProps;
      this.Component = Component;
      this.cachedSignals = null;
      this.depsMap = this.getDepsMap();
      this.props = props;
      this.mounted = true;
    }

    update(props) {
      if (this.mounted === false) {
        this.initialize(props);
        this.componentWillMount();
        this.render();
      } else {
        this.componentWillReceiveProps(props);
        if (this.shouldComponentUpdate()) {
          this.render();
        }
      }
    }

    componentWillMount() {
      if (!this.controller) {
        throw new Error(`Can not find Cerebral controller`);
      }
      if (!this.evaluatedPaths) {
        return;
      }
      this.registerComponent(this, this.depsMap);
    }

    componentWillReceiveProps(nextProps) {
      const hasChange = propsDiffer(this.props, nextProps);
      if (hasChange) {
        this.props = nextProps;
      }
      // If dynamic paths, we need to update them
      if (typeof paths === `function`) {
        this.evaluatedPaths = CerebralComponent.getStatePaths(nextProps);
        const nextDepsMap = this.getDepsMap();
        if (propsDiffer(this.depsMap, nextDepsMap)) {
          this.updateComponent(this, this.depsMap, nextDepsMap);
          this.depsMap = nextDepsMap;
        }
      } else if (hasChange) {
        this.render();
      }
    }

    shouldComponentUpdate() {
      // We only allow forced render by change of props passed
      // or Container tells it to render
      return false;
    }

    getDepsMap() {
      return Object.keys(this.evaluatedPaths).reduce((currentDepsMap, pathKey) => {
        if (this.evaluatedPaths[pathKey] instanceof Computed) {
          return Object.assign(currentDepsMap, this.evaluatedPaths[pathKey].depsMap);
        }
        currentDepsMap[pathKey] = this.evaluatedPaths[pathKey];
        return currentDepsMap;
      }, {});
    }

    getProps() {
      const controller = this.controller;
      const model = controller.model;
      const props = this.props || {};
      const statePaths = CerebralComponent.getStatePaths(this.props);
      let propsToPass = Object.assign({}, props, Object.keys(statePaths || {}).reduce((currentProps, key) => {
        currentProps[key] = statePaths[key] instanceof Computed ? statePaths[key].getValue(model) : controller.getState(cleanPath(statePaths[key]));
        return currentProps;
      }, {}));
      if (this.signals) {
        const extractedSignals = typeof signals === `function` ? signals(propsToPass) : signals;
        propsToPass = Object.keys(extractedSignals).reduce((currentProps, key) => {
          currentProps[key] = controller.getSignal(extractedSignals[key]);
          return currentProps;
        }, propsToPass);
      }
      if (this.injectedProps) {
        propsToPass = Object.keys(this.injectedProps).reduce((currentProps, key) => {
          currentProps[key] = this.injectedProps[key];
          return currentProps;
        }, propsToPass);
      }
      if (this.controller.options.signalsProp) {
        propsToPass.signals = this.cachedSignals = this.cachedSignals || this.extractModuleSignals(this.controller.module, ``);
      }
      return propsToPass;
    }

    extractModuleSignals(module, parentPath) {
      return Object.keys(module.signals || {}).reduce((signals, signalKey) => {
        signals[signalKey] = this.controller.getSignal(parentPath ? `${parentPath}.${signalKey}` : `${signalKey}`);
        return signals;
      }, Object.keys(module.modules || {}).reduce((modules, moduleKey) => {
        modules[moduleKey] = this.extractModuleSignals(module.modules[moduleKey], parentPath ? `${parentPath}.${moduleKey}` : `${moduleKey}`);
        return modules;
      }, {}));
    }

    registerComponent (component, depsMap) {
      this.componentDependencyStore.addEntity(component, depsMap);
    }

    unregisterComponent (component, depsMap) {
      this.componentDependencyStore.removeEntity(component, depsMap);
    }

    updateComponent (component, prevDepsMap, depsMap) {
      this.componentDependencyStore.removeEntity(component, prevDepsMap);
      this.componentDependencyStore.addEntity(component, depsMap);
      this.render();
    }

    _update() {
      setTimeout(this.render);
    }

    render() {
      this.Component(this.getProps());
    }

  }
  CerebralComponent.displayName = `CerebralWrapping_Function`;

  return CerebralComponent;
}

export function ConnectFunction (controller, paths, passedSignals, injectedProps) {
  let signals = passedSignals;
  let props = injectedProps;

  return (component) => {
    return new (HOC(controller, paths, signals, props, component))();
  };
}
