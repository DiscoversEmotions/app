import h from 'jsx-create-element';
import classNames from 'classnames';

import JsonViewer from './JsonViewer.jsx';

export default function Client ({ state, dispatch }) {
  return (
    <div className='client-tab'>
      <div className='client-status'>
        Status : { state.clientStatus }
      </div>
      { JsonViewer({ state, dispatch, object: state.clientStats, key: 'client'}) }
    </div>
  );
}
