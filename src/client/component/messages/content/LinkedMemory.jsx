import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

function getMemoryFile (level) {
  switch (level) {
    case 1: return `/data/memories/20161208-1729.mem`;
    case 2: return `/data/memories/20161208-1730.mem`;
    case 3: return `/data/memories/20161208-1732.mem`;
  }
}

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const MemoryFile = styled.span`
  font-family: 'Anonymous Pro', monospace;
  color: white;
`;

const LinkedMemory = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='Associated Memory'
    >
      <Text>To complete the recovery, the memory <MemoryFile>{ getMemoryFile(msg.level) }</MemoryFile> need to be restored.</Text>
      <Button>Press [enter] to restore the memory</Button>
    </Message>
  )
};

export default LinkedMemory;
