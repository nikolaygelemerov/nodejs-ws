import { throttle } from '@utils';
import io from 'socket.io-client';

import { ITEMS_COUNT } from '@constants';
import { SocketPayload } from '@types';

/* Start Create ul with li elements */

const ul = document.createElement('ul');
const body = document.querySelector('body');

body?.appendChild(ul);

const ulList: HTMLLIElement[] = [];

const indexAnimationStatusMap: Record<string, 'start' | 'end'> = {};
const indexCountMap: Record<string, number> = {};

for (let i = 0; i < ITEMS_COUNT; i++) {
  const li = document.createElement('li');
  li.textContent = `${i}`;

  li.onanimationend = () => {
    indexAnimationStatusMap[i] = 'end';
    li.classList.remove('updateUp');
    li.classList.remove('updateDown');
  };

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
  ulList.forEach((li) => {
    li.classList.remove('updateUp');
    li.classList.remove('updateDown');
  });
});

/* End Add buttons event listeners for start and stop emitting */

// Socket on "posts" handler
const update = ({ id, post: { count } }: SocketPayload) => {
  if (indexCountMap[id] === count) {
    return;
  }

  const liToUpdate = ulList.find((_, index) => index === id);

  if (liToUpdate && indexAnimationStatusMap[id] === 'end') {
    indexAnimationStatusMap[id] = 'start';

    if (count > indexCountMap[id] || 0) {
      console.log('THERE');
      liToUpdate?.classList.add('updateUp');
    } else {
      liToUpdate?.classList.add('updateDown');
    }

    indexCountMap[id] = count;
  }
};

const throttledUpdate = throttle(update, 20);

const queue: SocketPayload[] = [];
let timeout: NodeJS.Timeout | null;

// Handling socket on "posts" messages
socket.on('posts', (socketData: SocketPayload) => {
  update(socketData);

  // queue.push(socketData);

  // if (!timeout) {
  //   timeout = setTimeout(() => {
  //     queue.forEach((data) =>
  //       requestAnimationFrame(() => {
  //         update(data);
  //       })
  //     );
  //     console.log('CLEAR');
  //     if (timeout) {
  //       clearTimeout(timeout);
  //     }
  //     timeout = null;
  //   }, 10000);
  // }

  // throttledUpdate(data);
});
