import React from 'react';
import { BindCSS, Connect } from '~/core';
import styles from './System';
import { startRecovery } from '~/actions';
import _ from 'lodash';

const allMessages = [
  { time: 1, value: `Connection au système nerveux...` },
  { time: 3, value: `Récupération des souvenirs... 1/3450` },
  { time: 3.5, value: `Récupération des souvenirs... 2/3450` },
  { time: 4, value: `Mise à jour des règles de d'analyse...` },
  { time: 4.5, value: `Récupération des émotions ... 1/47` },
  { time: 5, value: `Récupération des émotions ... 2/47` },
  { time: 6, value: `Erreur: Emotion maquante : Joie` },
  { time: 7, value: `Erreur: Emotion maquante : Colère` }
];

@Connect(
  (state, props) => ({
    color: state.get(`color`),
    messages: state.get(`messages`),
    bootData: state.getIn([`step`, `data`, `boot`]).toJS(),
    step: state.getIn([`step`, `current`])
  }),
  { startRecovery }
)
@BindCSS(styles)
class System extends React.Component {
  render() {
    const messages = this.getBootStepMessages();
    const classes = [`system`];
    if (this.props.step !== `boot`) {
      classes.push(`full`);
    }
    return (
      <div
        styleName={classes.join(` `)}
      >
        <div>
          { messages.map((mess, index) => (
            <p key={index}>{ mess.value }</p>
          )) }
        </div>
        { this.renderAsk() }
      </div>
    );
  }

  getBootStepMessages() {
    return _(allMessages)
    .filter(mess => mess.time <= this.props.bootData.seconds)
    .orderBy(`time`)
    .slice(-5)
    .value();
  }

  renderAsk() {
    if (this.props.step === `boot`) {
      return null
    }
    return (
      <button
        onClick={() => this.props.startRecovery() }
      >
        Start Recovery
      </button>
    );
  }
}

export default System;
