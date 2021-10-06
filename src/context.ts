import { createContext, useContext } from 'react';

export type SocketContent = {
  socket: any
}

export const SocketContext = createContext<SocketContent>({
  socket: null,
});

export const useSocketContext = () => useContext(SocketContext);