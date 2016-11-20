import React from 'react';
import styled from 'styled-components';
import { Connect } from '~/core';
import { Steps } from '~/types';
import _ from 'lodash';
import Button from '~/component/Button';

const StyledDiv = styled.div`
  position: absolute;
  height: ${ (props) => !props.full ? `120px` : `300px` };
  width: ${ (props) => !props.full ? `300px` : `500px` };
  bottom: ${ (props) => !props.full ? `2%` : `50%` };
  right: ${ (props) => !props.full ? `2%` : `50%` };
  background: rgba(0, 0, 0, 0.68);
  padding: 10px;
  transition-duration: .3s;
  color: white;
  line-height: 1.5;
  transform: translate(${ (props) => !props.full ? `0, 0` : `50%, 50%` });

  p {
    margin: 0;
    padding: 0;
  }
`;

@Connect(
  (state, computedState, props) => {
    return {
      step: computedState.get(`step`),
      messages: [], // uiState.get(`messages`).toJS(),
      full: false // uiState.get(`systemFull`)
    };
  },
  (actions) => ({
    startRecovery: actions.startRecovery
  })
)
class System extends React.Component {
  render() {
    return (
      <StyledDiv full={this.props.full}>
        { this.renderContent() }
      </StyledDiv>
    );
  }

  renderContent() {
    console.log(this.props.step);
    switch (this.props.step) {
      case Steps.Boot:
        return this.renderBoot();
      case Steps.MissingFiles:
        return this.renderMissingFiles();
      case Steps.RecoveryWillStart:
        return this.renderRecoveryWillStart();
      case Steps.RecoveryLvl1Done:
        return this.renderRecoveryLvl1Done();
      default:
        return null;
    }
  }

  renderBoot() {
    return (
      <div>
        <Button>
          Yolo
        </Button>
        { this.props.messages.map(msg => (
          <p key={ msg.id }>{ msg.value }</p>
        )) }
      </div>
    );
  }

  renderMissingFiles() {
    return (
      <Button onClick={() => this.props.startRecovery() }>
        Start Recovery
      </Button>
    );
  }

  renderRecoveryWillStart() {
    return (
      <div>
        <p>Are you ready</p>
        <Button onClick={() => this.props.setStep(Steps.RecoveryLvl1) }>
          Go !
        </Button>
      </div>
    );
  }

  renderRecoveryLvl1Done() {
    return (
      <div>
        <h2>Emotion recovered !</h2>
      </div>
    );
  }

}

export default System;
