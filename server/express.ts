/* eslint-disable @typescript-eslint/no-var-requires */
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types';
import express from 'express';
import { Server } from 'socket.io';

const app = express();

const PORT = process.env.PORT || 8090;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  server,
  {
    cors: {
      origin: 'http://localhost:8080'
    }
  }
);

io.on('connection', (socket) => {
  console.log('Client connected');

  let intervalId: NodeJS.Timer | null = null;

  socket.on('start', () => {
    console.log('Start');

    intervalId = setInterval(() => {
      socket.emit('posts', { action: 'create', post: 'Post' });
      console.log('EMIT');
    }, 200);
  });

  socket.on('stop', () => {
    if (intervalId) {
      socket.off('posts');
      clearInterval(intervalId);
    }
  });
});
