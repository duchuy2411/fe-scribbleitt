import React, { useContext, createContext } from 'react';
import logo from './logo.svg';
import Canvas from './features/canvas';
import Login from './features/login/index';
import './App.css';

import { SocketContext } from './context';

import { io } from 'socket.io-client';

const socket = io("192.168.1.14:3000", { transports : ['websocket'] });

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
