import h from 'jsx-create-element';
import classNames from 'classnames';
import _ from 'lodash';
import Convert from 'ansi-to-html';

const convert = new Convert();
const VNode = require('virtual-dom/vnode/vnode');
const VText = require('virtual-dom/vnode/vtext');
const convertHTML = require('html-to-vdom')({
  VNode: VNode,
  VText: VText
});

function hasContent (item) {
  if (_.isEmpty(item)) {
    return false;
  }
  if (_.isArray(item)) {
    return true;
  }
  if (_.isObject(item)) {
    if (_.isString(item.type)) {
      return true;
    }
    return true;
  }
  return false;
}

function InlineValue ({ dispatch, object, localState, key, newPath, objKey, item }) {
  const keyVal = (<span className='jv-pre jv-property-name'>{ objKey }</span>);
  const inlineVal = (() => {
    if (_.isRegExp(item)) {
      return (<span className='jv-pre jv-inline js-inline-regex'>{ content.toString() }</span>);
    }
    if (_.isString(item)) {
      if (item.length < 50) {
        return (<span className='jv-pre jv-inline jv-inline-string'>{ item }</span>);
      }
      return (
        <div style={{ marginLeft: '30px' }}>
          <span className='jv-pre jv-inline jv-inline-string'>{ item }</span>
        </div>
      );
    }
    if (_.isNumber(item)) {
      return (<span className='jv-pre jv-inline jv-inline-num'>{ String(item) }</span>);
    }
    if (_.isBoolean(item)) {
      if (item === true) {
        return (<span className='jv-pre jv-inline jv-inline-true'>{ String(item) }</span>);
      }
      return (<span className='jv-pre jv-inline jv-inline-false'>{ String(item) }</span>);
    }
    if (_.isArray(item)) {
      if (localState[newPath.join('.')] !== true) {
        var content = '[...]';
        if (_.isEmpty(item)) {
          content = '[]';
        }
        return (<span className='jv-pre jv-inline js-inline-more'>{ content }</span>);
      }
      return null;
    }
    if (_.isObject(item)) {
      if (localState[newPath.join('.')] !== true) {
        var content = '{...}';
        if (_.isEmpty(item)) {
          content = '{}';
        }
        return (<span className='jv-pre jv-inline js-inline-more'>{ content }</span>);
      }
      return null;
    }
    return null;
  })()
  return <span>{ keyVal }<span className='jv-pre'>:</span>{ inlineVal }</span>
}

function Content ({ dispatch, object, localState, key, newPath, item }) {
  if (!hasContent(item)) {
    return null;
  }
  if (localState[newPath.join('.')] !== true) {
    return null;
  }
  if (_.isObject(item)) {
    if (_.isString(item.type) && !_.isNil(item.content)) {
      if (item.type === 'html') {
        return convertHTML(item.content);
      } else if (item.type === 'console') {
        const htmlString = convert.toHtml(item.content);
        return (
          <div className='jv-console'>
            <pre>
              { convertHTML(htmlString) }
            </pre>
          </div>
        );
      } else if (item.type === 'git') {
        // Do nothing, ignore
      } else {
        return `Unknown type "${item.type}"`;
      }
    }
    return ObjectViewer({ dispatch, object, localState, key, path: newPath });
  }
}


function ObjectViewer ({ dispatch, object, localState, key, path }) {
  var currentObject = path.length === 0 ? object : _.get(object, path, null);
  if (_.isNil(currentObject)) {
    return (
      <span className='jv-pre jv-inline js-inline-null'>null</span>
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
              className='jv-property'
              onclick={() => {
                if (hasContent(item)) {
                  dispatch({
                    type: 'JSON_VIEWER_TOGGLE_PATH',
                    key: key,
                    payload: newPath.join('.')
                  })
                }
              }}
            >
              { InlineValue({ dispatch, object, localState, key, newPath, objKey, item }) }
            </div>
            { Content({ dispatch, object, localState, key, newPath, item }) }
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
      { ObjectViewer({ dispatch, object, localState, key, path: [] }) }
    </div>
  );
}
