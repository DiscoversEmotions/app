import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  height: 3px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Bar = styled.div`
  height: 3px;
  background: ${(props) => {
    switch (props.type) {
      case `normal`: return `white`;
      case `success`: return `#4CAF50`;
      case `error`: return `#F44336`;
    }
  }};
  width: ${(props) => (props.progress * 100)}%;
`;

Bar.propTypes = {
  type: React.PropTypes.string, // `normal` | `success` | `error`
  progress: React.PropTypes.number, // [0 -> 1]
}

Bar.defaultProps = {
  type: `normal`,
  progress: 1
}

const Progress = (props) => {
  const msg = props.msg;
  return (
    <Container>
      <Bar type={props.type} progress={props.progress} />
    </Container>
  );
};

Progress.propTypes = {
  type: React.PropTypes.string, // `normal` | `success` | `error`
  value: React.PropTypes.number, // [0 -> 1]
};

Progress.defaultProps = {
  type: `normal`,
  value: 1
};

export default Progress;
