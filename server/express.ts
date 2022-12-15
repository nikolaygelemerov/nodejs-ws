import { ClientToServerEvents, ServerToClientEvents } from './types';
import express from 'express';
import { Server } from 'socket.io';

import { ITEMS_COUNT } from '@constants';

const app = express();

const PORT = process.env.PORT || 8090;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: 'http://localhost:8080'
  }
});

const EMIT_INTERVAL = 0; // ms

io.on('connection', (socket) => {
  console.log('Client connected');

  let intervalId: NodeJS.Timer | null = null;

  const onStartListener = () => {
    console.log('Start');

    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      socket.emit('posts', {
        action: 'update',
        id: Math.floor(Math.random() * ITEMS_COUNT),
        post: { count: Math.floor(Math.random() * ITEMS_COUNT), data: 'Post' }
      });
    }, EMIT_INTERVAL);
  };

  socket.on('start', onStartListener);

  socket.on('stop', () => {
    console.log('Stop');

    if (intervalId) {
      socket.off('posts', onStartListener);
      clearInterval(intervalId);
    }
  });
});
