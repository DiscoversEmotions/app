import React from 'react';
import { BindCSS, Connect } from '~/core';
import styles from './TopMenu';
import { actions, Steps } from '~/store';
import _ from 'lodash';

@Connect(
  (state, computedState, props) => ({}),
  (actions) => ({})
)
@BindCSS(styles)
class TopMenu extends React.Component {
  render() {
    return <div styleName='top-menu'></div>;
  }
}

export default TopMenu;
