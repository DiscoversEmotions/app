import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const DeleteMemories = (props) => {
  const { msg } = props;
  const progress = msg.progress / 10;
  return (
    <Message
      msg={msg}
      progress={progress}
      title='Deleting memories'
    >
      <Text>
        Deleting memories
      </Text>
    </Message>
  )
};

export default DeleteMemories;
