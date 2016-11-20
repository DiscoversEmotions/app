import React from 'react';
import styled from 'styled-components';
import styles from './style.scss';
import { compose, Connect } from '~/core';
import System from '~/component/System';
import TopMenu from '~/component/TopMenu';

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const App = compose(
  Connect()
)((props) => {
  return (
    <AppContainer>
      <System />
      <TopMenu />
    </AppContainer>
  );
});

export default App;
