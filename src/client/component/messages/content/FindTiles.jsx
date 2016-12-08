import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const Name = styled.span`
  font-weight: 900;
`;

const FindTiles = (props) => {
  const { msg } = props;
  return (
    <Message msg={msg} title='Emotion Recovery'>
      <Text>
        Welcome to the <Name>Emotion Recovery Process</Name>.<br />Find red tiles to complete the process.
      </Text>
    </Message>
  )
};

export default FindTiles;
