import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Message from '~/component/messages/Message';
import Button from '~/component/Button';

const Text = styled.p`
  font-size: 14px;
  padding-left: 20px;
`;

const AreYouSure = (props) => {
  const { msg } = props;
  return (
    <Message
      msg={msg}
      type='error'
      title='Are you sure'
    >
      <Text>
        Keeping these memories could cause serious metal desorder.<br />
        Are you sure you want to keep these memories ?
      </Text>
      <Button style={{ paddingBottom: `0px` }}>Press [y] to keep</Button>
      <Button>Press [enter] to delete</Button>
    </Message>
  )
};

export default AreYouSure;
