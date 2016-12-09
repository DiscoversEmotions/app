import React from 'react';
import styled, { css } from 'styled-components';
import _ from 'lodash';


const Container = styled.div`
  margin-top: 2vh;
  width: 10px;

  svg {
    height: 100%;
  }
`;

const MenuSound = (props) => {
  return (
    <Container {...props} dangerouslySetInnerHTML={{__html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
        <rect style="fill: #FFFFFF" y="13" width="2" height="6"/>
        <rect style="fill: #FFFFFF" x="2" y="17" width="4" height="2"/>
        <rect style="fill: #FFFFFF" width="6" height="2"/>
        <rect style="fill: #FFFFFF" y="2" width="2" height="4"/>
        <rect style="fill: #FFFFFF" x="18" width="2" height="6"/>
        <rect style="fill: #FFFFFF" x="14" width="4" height="2"/>
        <rect style="fill: #FFFFFF" x="14" y="17" width="6" height="2"/>
        <rect style="fill: #FFFFFF" x="18" y="13" width="2" height="4"/>
      </svg>
    `}}>
    </Container>
  );
};

export default MenuSound;
