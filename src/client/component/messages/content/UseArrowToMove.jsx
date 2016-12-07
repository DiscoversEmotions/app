import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
  padding: 15px 20px;
`;

const UseArrowToMove = (props) => {
  const { msg } = props;
  return (
    <Message msg={msg}>
      <Text>
        Use [up] or [z] to move
      </Text>
    </Message>
  )
};

export default UseArrowToMove;
