import { Component, connect } from '~/core';
import { actions, store } from '~/redux';
import dominus from 'dominus';
import styles from './Loader';

class Loader extends Component {

  constructor($parent) {
    super($parent);
    this.$el.addClass(styles.loader);
    this.$el.on(`click`, this.onElClick.bind(this));
  }

  onElClick (e) {
    store.dispatch(actions.app.setLoaderStatus(!this.props.loader));
  }

  update () {
    this.$el.css(`background`, this.props.loader ? `blue` : `red`);
  }

}

function stateSelector (state, props) {
  return {
    loader: state.app.get(`loader`)
  };
}

export default connect(stateSelector)(Loader);
