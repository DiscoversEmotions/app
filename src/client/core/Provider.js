import {
  Component,
  PropTypes,
  Children
} from 'react';

export class Provider extends Component {
  getChildContext() {
    return {
      store: this.store,
      subscribe: this.subscribe
    };
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
    this.subscribe = this.subscribe.bind(this);
    this.listeners = [];
  }

  componentWillReceiveProps(nextProps) {
    this.store = nextProps.store;
  }

  render() {
    this.triggerChildUpdate();
    return Children.only(this.props.children);
  }

  triggerChildUpdate() {
    this.listeners.forEach(listener => {
      listener();
    });
  }

  subscribe() {
    if (typeof listener !== `function`) {
      throw new Error(`Expected listener to be a function.`);
    }
    var isSubscribed = true;
    this.listeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;
      var index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  }
}

Provider.propTypes = {
  store: PropTypes.any.isRequired,
  children: PropTypes.element.isRequired
};
Provider.childContextTypes = {
  store: PropTypes.any.isRequired,
  subscribe: PropTypes.func.isRequired
};
