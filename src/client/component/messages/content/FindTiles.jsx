import React from 'react';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const Name = styled.span`
  font-weight: 900;
`;

const howToAnnim = keyframes`
  100% { background-position: -3895px; }
`;

const HowTo = styled.div`
  width: 95px;
  height: 100px;
  background: url(${require('~/assets/tile-explain.png')}) left center;
  animation: ${howToAnnim} 2s steps(41) infinite;
  margin-left: 130px;
  margin-top: 0;
`;

const FindTiles = (props) => {
  const { msg } = props;
  return (
    <Message msg={msg} title='Emotion Recovery'>
      <Text>
        Welcome to the <Name>Emotion Recovery Process</Name>.<br />
        Find red tiles to complete the process.<br />
        Use [arrow keys] or [z, q, s, d] to move
      </Text>
      <HowTo />
    </Message>
  )
};

export default FindTiles;
