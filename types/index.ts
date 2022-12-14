export interface SocketPayload {
  action: string;
  id: number;
  post: { count: number; data: string };
}
