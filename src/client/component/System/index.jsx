import React from 'react';
import { BindCSS, Connect } from '~/core';
import styles from './System';
import { switchColor } from '~/actions';

@Connect(
  (state, props) => ({
    color: state.get(`color`)
  }),
  {
    switchColor
  }
)
@BindCSS(styles)
class System extends React.Component {
  render() {
    return (
      <div
        styleName='system'
        onClick={ () => this.props.switchColor() }
        style={{ background: this.props.color }}
      >
      </div>
    );
  }
}

export default System;
