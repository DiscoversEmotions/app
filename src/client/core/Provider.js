import { Component, PropTypes, Children } from 'react';

export class Provider extends Component {
  getChildContext() {
    return {
      store: this.store
    };
  }

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  componentWillReceiveProps (nextProps) {
    this.store = nextProps.store;
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.propTypes = {
  store: PropTypes.any.isRequired,
  children: PropTypes.element.isRequired
};
Provider.childContextTypes = {
  store: PropTypes.any.isRequired,
};
