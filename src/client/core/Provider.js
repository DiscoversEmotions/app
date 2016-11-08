import { Component, PropTypes, Children } from 'react';

export class Provider extends Component {
  getChildContext() {
    return {
      state: this.state,
      updateState: this.updateState
    };
  }

  constructor(props, context) {
    super(props, context);
    this.state = props.state;
    this.updateState = props.updateState;
  }

  componentWillReceiveProps (nextProps) {
    this.state = nextProps.state;
    this.updateState = nextProps.updateState;
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.propTypes = {
  state: PropTypes.any.isRequired,
  updateState: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
Provider.childContextTypes = {
  state: PropTypes.any.isRequired,
  updateState: PropTypes.func.isRequired
};
