import h from 'jsx-create-element';
import classNames from 'classnames';
import _ from 'lodash';



function ObjectViewer ({ dispatch, object, localState, key, path }) {
  var currentObject = path.length === 0 ? object : _.get(object, path, null);
  console.log('=====', object, currentObject, path);
  if (_.isNil(currentObject)) {
    return (
      <p>null</p>
    );
  }
  return (
    <div className='jv-obj'>
      { _.map(currentObject, (item, objKey) => {
        const newPath = [...path, objKey];
        return (
          <div
            className='jv-key'
          >
            <div
              className='js-property'
              onclick={() => {
                dispatch({
                  type: 'JSON_VIEWER_TOGGLE_PATH',
                  key: key,
                  payload: newPath.join('.')
                })
              }}
            >
              { objKey } : {
                (() => {
                  if (_.isObject(item)) {
                    if (localState[newPath.join('.')] !== true) {
                      return `{...}`;
                    }
                    return null;
                  }
                  if (_.isString(item)) {
                    return `"${item}"`;
                  }
                  if (_.isNumber(item) || _.isBoolean(item)) {
                    return String(item);
                  }
                  return null;
                })()
              }
            </div>
            { (() => {
              if (_.isObject(item) && localState[newPath.join('.')] === true) {
                return ObjectViewer({ dispatch, object, localState, key, path: newPath });
              }
              return null;
            })() }
          </div>
        );
      }) }
    </div>
  );
}


export default function JsonViewer ({ state, dispatch, object, key }) {
  const localState = state.jsonViewer[key];
  if (localState === undefined) {
    dispatch((disp) => {
      setTimeout(() => {
        disp({
          type: 'JSON_VIEWER_INIT',
          key: key
        })
      });
    });
    return null;
  }
  return (
    <div className='json-viewer'>
      <pre>
        <code>
          { ObjectViewer({ dispatch, object, localState, key, path: [] }) }
        </code>
      </pre>
    </div>
  );
}
