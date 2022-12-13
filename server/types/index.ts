import { SocketPayload } from '../../types';

export interface ServerToClientEvents {
  posts: (post: SocketPayload) => void;
}

export interface ClientToServerEvents {
  start: () => void;
  stop: () => void;
}
