import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import Message from '~/component/Message';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';

const NeedRecovery = compose(
  inject((provided) => ({ core: provided.core })),
  ConnectReact(
    {
    },
    {
      startRecovery: `app.startRecovery`
    }
  )
)((props) => {
  console.log(props.core);
  return (
    <div>
      3 error :/
      <Button onClick={() => {
        props.startRecovery();
        // Need to put that here because pointerLock must be based on a click
        props.core.pointerLock.tryActivate();
      }}>Start Recovery process</Button>
    </div>
  );
});

export default NeedRecovery;
