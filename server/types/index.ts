export interface ServerToClientEvents {
  posts: (post: { action: string; post: string }) => void;
}

export interface ClientToServerEvents {
  start: () => void;
  stop: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  age: number;
  name: string;
}
