import h from 'jsx-create-element';
const classNames = require('classnames');

export default function Config (state, dispatch) {
  return (
    <div classNames='config-tab'>
      <pre>
        <code>
          { JSON.stringify(state.config, null, 2) }
        </code>
      </pre>
    </div>
  );
}
