import React from 'react';
import styles from './App';
import { BindCSS, Connect, compose } from '~/core';
import System from '~/component/System';

function AppRender (props) {
  return (
    <div styleName='app-container'>
      <System />
    </div>
  );
}

const App = compose(
  Connect(),
  BindCSS(styles)
)(AppRender);

export default App;
