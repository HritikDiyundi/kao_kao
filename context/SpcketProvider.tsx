import React, { createContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface SocketContextType {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  setSocket: () => {},
});

export { SocketContext };
