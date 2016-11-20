import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
});

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || `Component`;
}

export function Connect (
  mapStateToProps = (store, props) => ({}),
  mapDispatchToProps = (actions) => ({}),
  mergeProps = defaultMergeProps,
  options = {}
) {
  const shouldSubscribe = Boolean(mapStateToProps);
  const mapState = mapStateToProps;
  const mapDispatch = mapDispatchToProps;
  const finalMergeProps = mergeProps;

  const { withRef = false } = options;
  const checkMergedEquals = finalMergeProps !== defaultMergeProps;

  return function wrapWithConnect (WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`;

    class Connected extends Component {

      shouldComponentUpdate() {
        return this.haveOwnPropsChanged || this.hasStoreStateChanged;
      }

      constructor(props, context) {
        super(props, context);
        this.store = context.store;
        this.subscribe = context.subscribe;

        const storeState = this.store.state;
        this.state = { storeState };
        this.clearCache();
      }

      computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props);
        }

        const state = store.state;
        const stateProps = this.doStatePropsDependOnOwnProps ?
          this.finalMapStateToProps(state, props) :
          this.finalMapStateToProps(state);

        return stateProps;
      }

      configureFinalMapState(store, props) {
        const mappedState = mapState(store.state, props);
        const isFactory = typeof mappedState === `function`;

        this.finalMapStateToProps = isFactory ? mappedState : mapState;
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

        if (isFactory) {
          return this.computeStateProps(store, props);
        }

        return mappedState;
      }

      computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props);
        }

        const { dispatch } = store;
        const dispatchProps = this.doDispatchPropsDependOnOwnProps ?
          this.finalMapDispatchToProps(dispatch, props) :
          this.finalMapDispatchToProps(dispatch);

        return dispatchProps;
      }

      configureFinalMapDispatch(store, props) {
        const mappedDispatch = mapDispatch(store.dispatch, props);
        const isFactory = typeof mappedDispatch === `function`;

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

        if (isFactory) {
          return this.computeDispatchProps(store, props);
        }

        return mappedDispatch;
      }

      updateStatePropsIfNeeded() {
        const nextStateProps = this.computeStateProps(this.store, this.props);
        if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
          return false;
        }

        this.stateProps = nextStateProps;
        return true;
      }

      updateDispatchPropsIfNeeded() {
        const nextDispatchProps = this.computeDispatchProps(this.store, this.props);
        if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
          return false;
        }

        this.dispatchProps = nextDispatchProps;
        return true;
      }

      updateMergedPropsIfNeeded() {
        const nextMergedProps = finalMergeProps(this.stateProps, this.dispatchProps, this.props);
        if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
          return false;
        }

        this.mergedProps = nextMergedProps;
        return true;
      }

      isSubscribed() {
        return typeof this.unsubscribe === `function`;
      }

      trySubscribe() {
        if (shouldSubscribe && !this.unsubscribe) {
          this.unsubscribe = this.subscribe(this.handleChange.bind(this));
          this.handleChange();
        }
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      }

      componentDidMount() {
        this.trySubscribe();
      }

      componentWillReceiveProps(nextProps) {
        if (!shallowEqual(nextProps, this.props)) {
          this.haveOwnPropsChanged = true;
        }
      }

      componentWillUnmount() {
        this.tryUnsubscribe();
        this.clearCache();
      }

      clearCache() {
        this.dispatchProps = null;
        this.stateProps = null;
        this.mergedProps = null;
        this.haveOwnPropsChanged = true;
        this.hasStoreStateChanged = true;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;
        this.renderedElement = null;
        this.finalMapDispatchToProps = null;
        this.finalMapStateToProps = null;
      }

      handleChange() {
        if (!this.unsubscribe) {
          return;
        }

        const storeState = this.store.state;
        const prevStoreState = this.state.storeState;
        if (prevStoreState === storeState) {
          return;
        }

        if (!this.doStatePropsDependOnOwnProps) {
          const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
          if (!haveStatePropsChanged) {
            return;
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value;
          }
          this.haveStatePropsBeenPrecalculated = true;
        }

        this.hasStoreStateChanged = true;
        this.setState({ storeState });
      }

      getWrappedInstance() {
        if (withRef !== true && withRef !== false) {
          console.error(
            `To access the wrapped instance, you need to specify ` +
            `{ withRef: true } as the fourth argument of the connect() call.`
          );
        }

        return this.refs.wrappedInstance;
      }

      // render () {
      //   return React.createElement(
      //     WrappedComponent,
      //     Object.assign(
      //       {},
      //       this.props,
      //       mapStateToProps(this.store.state, this.store.computedState, this.props),
      //       mapDispatchToProps(this.store.actions)
      //     )
      //   );
      // }

      render() {
        const {
          haveOwnPropsChanged,
          hasStoreStateChanged,
          haveStatePropsBeenPrecalculated,
          statePropsPrecalculationError,
          renderedElement
        } = this;

        this.haveOwnPropsChanged = false;
        this.hasStoreStateChanged = false;
        this.haveStatePropsBeenPrecalculated = false;
        this.statePropsPrecalculationError = null;

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError;
        }

        let shouldUpdateStateProps = true;
        let shouldUpdateDispatchProps = true;
        if (renderedElement) {
          shouldUpdateStateProps = (
            hasStoreStateChanged || (
              haveOwnPropsChanged && this.doStatePropsDependOnOwnProps
            )
          );
          shouldUpdateDispatchProps =
            haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
        }

        let haveStatePropsChanged = false;
        let haveDispatchPropsChanged = false;
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true;
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded();
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
        }

        let haveMergedPropsChanged = true;
        if (
          haveStatePropsChanged ||
          haveDispatchPropsChanged ||
          haveOwnPropsChanged
        ) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
        } else {
          haveMergedPropsChanged = false;
        }

        if (!haveMergedPropsChanged && renderedElement) {
          return renderedElement;
        }

        if (withRef) {
          this.renderedElement = React.createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: `wrappedInstance`
          });
        } else {
          this.renderedElement = React.createElement(WrappedComponent,
            this.mergedProps
          );
        }

        return this.renderedElement;
      }

    }

    Connect.displayName = connectDisplayName;
    Connect.WrappedComponent = WrappedComponent;
    Connected.contextTypes = {
      store: PropTypes.any.isRequired,
    };

    return Connected;
  };
}
