import h from 'jsx-create-element';
import classNames from 'classnames';

import JsonViewer from './JsonViewer.jsx';

function Progress ({ progress, width, height }) {
  return (
    <div className='progress' style={{ width: width + 'px', height: height + 'px' }}>
      <span style={{ width: progress + '%' }}></span>
    </div>
  );
}

export default function Client ({ state, dispatch }) {
  return (
    <div className='client-tab'>
      <div className='client-status'>
        {(() => {
          if (state.clientStatus) {
            return (
              <span>
                Progress : { Progress({ progress: state.clientStatus.percentage * 100, width: 200, height: 15 }) } <br />
                Message : { state.clientStatus.msg }
              </span>
            );
          }
          return ('No Data')
        })()}
      </div>
      { JsonViewer({ state, dispatch, object: state.clientStats, key: 'client'}) }
    </div>
  );
}
