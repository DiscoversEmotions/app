import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import ErrorIcon from '~/component/icons/ErrorIcon';

const Text = styled.p`
  font-size: 14px;
  padding-left: 30px;
  margin-top: 5px;
`;

const LinkedEmotion = styled.p`
  font-size: 14px;
  padding-left: 60px;
  color: white;
`;

const LinkedEmotionDetail = styled.p`
  font-family: 'Anonymous Pro', monospace;
  font-size: 14px;
  padding-left: 70px;
  color: white;
`;

const File = styled.span`
  font-family: 'Anonymous Pro', monospace;
  font-size: 14px;
`;

const LinkedEmotionContainer = styled.div`
  position: relative;
  margin-top: 10px;
`;

// case 1: return `/data/memories/20161208-1729.mem`;
// case 2: return `/data/memories/20161208-1730.mem`;
// case 3: return `/data/memories/20161208-1732.mem`;

// case 1: return `/data/emotions/love.em`;
// case 2: return `/data/emotions/anger.em`;
// case 3: return `/data/emotions/sadness.em`;

const DeleteMemories = (props) => {
  const { msg } = props;
  const progress = msg.progress / 15;
  const icon = <ErrorIcon size={26} strokeWidth={35} color='white' style={{ position: `absolute`, left: `20px`, top: `10px` }} />;
  return (
    <Message
      msg={msg}
      progress={progress}
      title='Deleting memories'
    >
      <Text>Deleting <File>/data/memories/20161208-1732.mem</File></Text>
      {((msg.progress > 0) ? (
        <LinkedEmotionContainer>
          <LinkedEmotion>Sadness emotion is linked to the memory and must to be deleted too</LinkedEmotion>
          <LinkedEmotion>Deleting <File>/data/emotions/sadness.em</File></LinkedEmotion>
          { icon }
        </LinkedEmotionContainer>
      ) : null)}
      {((msg.progress > 3) ? (
        <Text>Deleting <File>/data/memories/20161208-1730.mem</File></Text>
      ) : null)}
      {((msg.progress > 6) ? (
        <LinkedEmotionContainer>
          <LinkedEmotion>Anger emotion is linked to the memory and must to be deleted too</LinkedEmotion>
          <LinkedEmotion>Deleting <File>/data/emotions/anger.em</File></LinkedEmotion>
          { icon }
        </LinkedEmotionContainer>
      ) : null)}
      {((msg.progress > 9) ? (
        <Text>Deleting <File>/data/memories/20161208-1732.mem</File></Text>
      ) : null)}
      {((msg.progress > 12) ? (
        <LinkedEmotionContainer>
          <LinkedEmotion>Love emotion is linked to the memory and must to be deleted too</LinkedEmotion>
          <LinkedEmotion>Deleting <File>/data/emotions/anger.em</File></LinkedEmotion>
          { icon }
        </LinkedEmotionContainer>
      ) : null)}
    </Message>
  )
};

export default DeleteMemories;
