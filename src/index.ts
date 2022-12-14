import io from 'socket.io-client';

import { ITEMS_COUNT } from '@constants';
import { SocketPayload } from '@types';

/* Start Create ul with li elements */

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

ul.append(...ulList);

/* End Create ul with li elements */

// Create socket connection
const socket = io('http://localhost:8090');

/* Start Add buttons event listeners for start and stop emitting */

const startButton = document.querySelector('#button-start');
const stopButton = document.querySelector('#button-stop');

startButton?.addEventListener('click', () => {
  socket.emit('start');
});

stopButton?.addEventListener('click', () => {
  socket.emit('stop');
  ulList.forEach((li) => li.classList.remove('update'));
});

/* End Add buttons event listeners for start and stop emitting */

// A thread blocking function
const blocker = () => {
  const now = Date.now();

  while (Date.now() - 10 < now) {}
};

// Socket on "posts" handler
const update = (id: number) => {
  const liToUpdate = ulList.find((_, index) => index === id);

  if (liToUpdate) {
    liToUpdate?.classList.add('update');
    blocker();
  }
};

// RAF id
const rafId: number | null = null;

// Handling socket on "posts" messages
socket.on('posts', (data: SocketPayload) => {
  // if (rafId) {
  //   cancelAnimationFrame(rafId);
  // }

  // rafId = requestAnimationFrame(() => update(data.id));

  update(data.id);
});
