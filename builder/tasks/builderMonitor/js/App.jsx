import h from 'jsx-create-element';
const classNames = require('classnames');

import Config from './Config.jsx';

const tabs = [
  'Config',
  'Test'
]

export default function App (state, dispatch) {
  return (
    <div class='app'>
      <div className='app-tabs'>
        { tabs.map((tabName, index) => {
          return (
            <div
              className={ classNames({'tab': true, 'active': (state.tab === index)}) }
              onclick={() => {
                dispatch({ type: 'SET_TAB', payload: index });
              }}
            >{ tabName }</div>
          );
        }) }
      </div>
      <div className='app-content'>
        {(() => {
          switch (state.tab) {
            case 0:
              return Config(state, dispatch);
            default:
              return (<div>No data fro tab {state.tab}</div>)
          }
        })()}
      </div>
    </div>
  );
}
