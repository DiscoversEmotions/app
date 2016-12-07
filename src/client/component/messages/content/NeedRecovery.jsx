import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { compose, ConnectReact } from '~/core';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';
import ErrorIcon from '~/component/icons/ErrorIcon';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const ButtonContainer = styled.div`
  padding: 10px 20px;
`;


const NeedRecovery = compose(
  ConnectReact(
    {},
    {
      simulateKey: `keyboard.simulateKey`
    }
  )
)((props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      type='error'
      title='Missing Emotions'
      icon={ <ErrorIcon color='white' size={26} strokeWidth={35} /> }
    >
      <Text>
        3 emotion files are missing.<br />The emotion recovery process is required.
      </Text>
      <ButtonContainer>
        <Button>
          Press [enter] to start the emotion recovery process
        </Button>
      </ButtonContainer>
    </Message>
  )
});

export default NeedRecovery;
