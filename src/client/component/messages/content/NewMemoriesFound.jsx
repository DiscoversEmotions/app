import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

function getMemoryFile (progress) {
  if (progress < 10) { return `/data/memories/20161208-1729.mem`; }
  if (progress < 20) { return `/data/memories/20161208-1730.mem`; }
  return `/data/memories/20161208-1732.mem`;
}

const MemoryFile = styled.p`
  font-family: 'Anonymous Pro', monospace;
  padding-left: 40px;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
`;

const NewMemoriesFound = (props) => {
  const { msg } = props;
  const progress = msg.progress / 30;
  return (
    <Message
      msg={msg}
      progress={progress}
      title='Analysing new Memories'
    >
      <Text>3 new memories have been found.</Text>
      <Text>Analysing...</Text>
      <MemoryFile>{(() => {
        var result = [];
        if (msg.progress > 5) {
          result.push(`/data/memories/20161208-1729.mem`);
        }
        if (msg.progress > 10) {
          result.push(<br />);
          result.push(`/data/memories/20161208-1730.mem`);
        }
        if (msg.progress > 20) {
          result.push(<br />);
          result.push(`/data/memories/20161208-1732.mem`);
        }
        return result;
      })()}</MemoryFile>
    </Message>
  )
};

export default NewMemoriesFound;
