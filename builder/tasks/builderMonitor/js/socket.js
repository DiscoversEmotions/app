
export default function initSocket (store) {
  var socket = io.connect();

  socket.on('config', function (data) {
    store.dispatch({
      type: 'SET_CONFIG',
      payload: data
    })
  });

  socket.on('client-stats', function (data) {
    store.dispatch({
      type: 'SET_CLIENT_STATS',
      payload: data
    })
  });

  socket.on('client-status', function (data) {
    store.dispatch({
      type: 'SET_CLIENT_STATUS',
      payload: data
    })
  });

  return socket;
}
