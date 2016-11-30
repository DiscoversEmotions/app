import React from 'react';
import styled from 'styled-components';

function getColor (type) {
  switch (type) {
    case `normal`:
      return `white`;
    case `error`:
      return `rgb(115, 61, 45)`;
    case `success`:
      return `rgb(47, 83, 120)`;
    default:
      return `white`;
  }
}

function getShadowColor (type) {
  return `rgba(0, 0, 0, 0.5)`;
}

const Message = styled.div`
  height: 26px;
  font-family: 'Anonymous Pro', monospace;
  text-align: right;
  padding: 0;
  margin: 0;
  font-size: 16px;
  color: ${ (props) => getColor(props.type) }
  text-shadow: 0 0 5px ${ (props) => getShadowColor(props.type) };
`;

Message.defaultProps = {
  type: `normal`
};


export default Message;
