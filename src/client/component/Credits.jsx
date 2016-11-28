import React from 'react';
import styled from 'styled-components';
import { Steps } from '~/types';
import _ from 'lodash';
import Button from '~/component/Button';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';

const Container = styled.div`
  background-color: black;
  color: white;
`;

const Credits = compose(
  inject((provided) => ({ core: provided.core })),
  ConnectReact(
    {
    }
  )
)((props) => {
  return (
    <Container full={props.full || false }>
      BLABLABLA
    </Container>
  );
});



export default Credits;
