import h from 'jsx-create-element';
import classNames from 'classnames';

export default function Actions ({ state, dispatch, socket }) {
  return (
    <div className='actions-tab'>
      <button onclick={() => {
          socket.emit('restart-server');
        }}>Restart server</button>
    </div>
  );
}
