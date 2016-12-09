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

const MenuFullscreen = (props) => {
  return (
    <Container {...props} dangerouslySetInnerHTML={{__html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="37.56" height="17.594" viewBox="0 0 37.56 17.594">
        <path style="fill: #FFFFFF" d="M4648,940.4h1.84v2.164H4648V940.4Z" transform="translate(-4648 -925)"/>
        <path style="fill: #FFFFFF" d="M4654.06,934.3h2.03v8.3h-2.03v-8.3Z" transform="translate(-4648 -925)"/>
        <path style="fill: #FFFFFF" d="M4660.28,925H4662v16.9h-1.72V925Z" transform="translate(-4648 -925)"/>
        <path style="fill: #FFFFFF" d="M4666.25,930.666h1.69v11.019h-1.69V930.666Z" transform="translate(-4648 -925)"/>
        <path style="fill: #FFFFFF" d="M4672.38,932.279h1.81v9.681h-1.81v-9.681Z" transform="translate(-4648 -925)"/>
        <rect style="fill: #FFFFFF" x="29.72" y="4.125" width="1.78" height="12.875"/>
        <path style="fill: #FFFFFF" d="M4683.81,937.215h1.75v5.392h-1.75v-5.392Z" transform="translate(-4648 -925)"/>
      </svg>
    `}}>
    </Container>
  );
};

export default MenuFullscreen;
