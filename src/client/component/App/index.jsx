import React from 'react';
import styles from './App';
import { BindCSS } from '~/core';
import WebGLMain from '~/component/WebGLMain';

@BindCSS(styles)
class App extends React.Component {

  render() {
    return (
      <div styleName='app-container'>
        <WebGLMain />
      </div>
    );
  }

}

export default App;
