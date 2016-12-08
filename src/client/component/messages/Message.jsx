import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Progress from '~/component/messages/Progress';
import { compose, ConnectReact } from '~/core';
import { inject } from 'react-tunnel';
import { lastMessage } from '~/computed';

const Container = styled.div`
  position: absolute;
  bottom: ${(props) => props.bottomDist }px;
  height: ${(props) => props.theHeight - 10 }px;
  width: ${(props) => props.theWidth }px;
  text-align: left;
  padding: 0;
  box-sizing: border-box;
  margin: 0;
  right: 0px;
  font-size: 16px;
  color: white;
  transition-duration: .3s;
  background: rgba(255, 255, 255, 0.01);
  box-shadow: 0 0 40px 5px rgba(0, 0, 0, 0.1);
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Title = styled.h3`
  margin: 0;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: ${(props) => (props.hasIcon ? 65 : 15)}px;
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
`;

const IconContainer = styled.div`
  position: absolute;
  left: 20px;
  top: 15px;
`;

const Message = (props) => {
  const msg = props.msg;

  return (
    <Container bottomDist={ msg.distFromBottom } theHeight={ msg.height } theWidth={ msg.width || 300 } >
      <RelativeContainer>
        <Progress progress={ props.progress } type={ props.type } />
        { props.icon ? <IconContainer>{ props.icon }</IconContainer> : null }
        { props.title ? <Title hasIcon={ props.icon }>{ props.title }</Title> : null }
        { props.children }
      </RelativeContainer>
    </Container>
  );
};

Message.propTypes = {
  type: React.PropTypes.string, // `normal` | `success` | `error`
  progress: React.PropTypes.number,
  msg: React.PropTypes.shape({
    distFromBottom: React.PropTypes.number,
    height: React.PropTypes.number,
    width: React.PropTypes.number
  }).isRequired,
  title: React.PropTypes.element,
  children: React.PropTypes.element,
  icon: React.PropTypes.element,
};

Message.defaultProps = {
  type: `normal`,
  progress: 1,
  children: null
};

export default Message;
