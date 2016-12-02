import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Button from '~/component/Button';
import MessageBox from '~/component/MessageBox';
import NeedRecovery from '~/component/NeedRecovery';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { lastMessage } from '~/computed';

const SimpleMessage = compose(
  // inject((provided) => ({ core: provided.core })),
  // ConnectReact(
  //   {
  //     lastMessage: lastMessage
  //   }
  // )
)((props) => {
  return (
    <MessageBox>
      Message
    </MessageBox>
  );
});

export default SimpleMessage;
