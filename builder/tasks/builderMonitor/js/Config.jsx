import h from 'jsx-create-element';
import classNames from 'classnames';

import JsonViewer from './JsonViewer.jsx';

export default function Config ({ state, dispatch }) {
  return (
    <div className='config-tab'>
      { JsonViewer({ state, dispatch, object: state.config, key: 'config'}) }
    </div>
  );
}
