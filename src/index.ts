import io from 'socket.io-client';

const socket = io('http://localhost:8090');

const startButton = document.querySelector('#button-start');
const stopButton = document.querySelector('#button-stop');

startButton?.addEventListener('click', () => {
  socket.emit('start');
});

stopButton?.addEventListener('click', () => {
  socket.emit('stop');
});
