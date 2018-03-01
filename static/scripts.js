/* global io */
(() =>{
  const socket = io(`${location.protocol}//${location.hostname}`);
  socket.on('incoming-message', message => console.log(message));
})(io);

