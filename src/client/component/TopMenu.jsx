import React from 'react';
import styled from 'styled-components';
import { compose } from '~/core';

import _ from 'lodash';

const TopMenuContainer = styled.div`
  position: absolute;
  height: 100px;
  width: 400px;
  top: 0;
  left: 50%;
  background: rebeccapurple;
  transition-duration: .3s;
  transform: translate(-50%, 0);

  &.hidden {
    transform: translate(0, -100%);
  }
`;

const TopMenu = compose(

)((props) => {
  return <TopMenuContainer />;
});

export default TopMenu;
