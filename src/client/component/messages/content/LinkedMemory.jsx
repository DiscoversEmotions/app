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

const MemoryFile = styled.p`
  font-family: 'Anonymous Pro', monospace;
  color: white;
  padding-left: 20px;
  padding-top: 5px;
  font-size: 14px;
`;

const LinkedMemory = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      title='Associated Memory'
    >
      <Text>To complete the recovery, the following memory file need to be restored :</Text>
      <MemoryFile>{ getMemoryFile(msg.level) }</MemoryFile>
      <Button>Press [enter] to restore the file</Button>
    </Message>
  )
};

export default LinkedMemory;
