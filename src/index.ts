import { ITEMS_COUNT } from '../constants';
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

const ul = document.createElement('ul');
const body = document.querySelector('body');

body?.appendChild(ul);

const ulList: HTMLLIElement[] = [];

for (let i = 0; i < ITEMS_COUNT; i++) {
  const li = document.createElement('li');
  li.textContent = `${i}`;
  li.ontransitionend = () => li.classList.remove('update');

  ulList.push(li);
}

socket.on('posts', (data) => {
  const liToUpdate = ulList.find((_, index) => index === data.id);

  liToUpdate?.classList.add('update');
});

ul.append(...ulList);
