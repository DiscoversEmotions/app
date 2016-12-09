import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import _ from 'lodash';
import MenuLogo from '~/component/MenuLogo';
import MenuFullscreen from '~/component/MenuFullscreen';
import MenuSound from '~/component/MenuSound';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8vh;
  z-index: 3000;
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Actions = styled.div`
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;

  > * {
    display: inline-block;
    width: 40px;
    margin-left: 40px;
    cursor: pointer;
  }
`;

const Menu = (props) => {
  return (
    <Container full={props.full || false }>
      <RelativeContainer>
        <MenuLogo style={{ height: `5vh` }} />
        <Actions>
          <MenuFullscreen />
          <MenuSound />
        </Actions>
      </RelativeContainer>
    </Container>
  );
};

export default Menu;
