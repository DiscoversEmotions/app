export default function initSocket (store) {
  var socket = io.connect();

  socket.on('config', function (data) {
    console.log('config', data);
    store.dispatch({
      type: 'SET_CONFIG',
      payload: data
    })
  });
}
