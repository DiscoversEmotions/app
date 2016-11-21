import React from 'react';
import styled from 'styled-components';
import styles from './style.scss';
import { compose, ConnectReact } from '~/core';
import System from '~/component/System';
import TopMenu from '~/component/TopMenu';

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Title = styled.h1`
  position: relative;
  top: 0;
  font-size: 20px;
  z-index: 1000;
`;

const App = compose(
  ConnectReact(
    {
      title: 'app.title',
      subTitle: 'app.subTitle',
      aboutVisible: 'app.aboutVisible'
    }
  )
)((props) => {
  return (
    <AppContainer>
      <Title>{ props.title } - { props.subTitle } - { (props.aboutVisible + ``) }</Title>
      <System />
      <TopMenu />
    </AppContainer>
  );
});

export default App;
