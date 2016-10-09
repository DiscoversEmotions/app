import h from 'jsx-create-element';
import classNames from 'classnames';

import Config from './Config.jsx';
import Actions from './Actions.jsx';
import Client from './Client.jsx';

const tabs = [
  'Config',
  'Actions',
  'Client'
]

export default function App ({ state, dispatch, socket }) {
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
              return Config({ state, dispatch, socket });
            case 1:
              return Actions({ state, dispatch, socket });
            case 2:
              return Client({ state, dispatch, socket });
            default:
              return (<div>No data fro tab {state.tab}</div>)
          }
        })()}
      </div>
    </div>
  );
}
