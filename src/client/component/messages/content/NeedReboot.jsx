import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const NeedReboot = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      type='error'
      title='Reboot'
    >
      <Text>
        You need to reboot the system to apply recents changes.
      </Text>
      <Button>
        Press [enter] to reboot
      </Button>
    </Message>
  )
};

export default NeedReboot;
