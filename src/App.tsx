import React, { useContext, createContext } from 'react';
import logo from './logo.svg';
import Canvas from './features/canvas/Canvas';
import './App.css';

import { SocketContext } from './context';

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", { transports : ['websocket'] });

function App() {
  return (
    <SocketContext.Provider value={{ socket }}>
      <div className="App">
        <Canvas />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
