import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const Thanks = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      type='error'
      title='You made the right choice'
    >
      <Text>Thanks for playing.</Text>
      <Button>Press [enter] to show credits</Button>
    </Message>
  )
};

export default Thanks;
