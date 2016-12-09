import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import _ from 'lodash';
import MenuLogo from '~/component/MenuLogo';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8vh;
  z-index: 3000;
`;

const Menu = (props) => {
  return (
    <Container full={props.full || false }>
      <MenuLogo style={{ height: `5vh` }} />
    </Container>
  );
};

export default Menu;
