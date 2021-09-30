import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://192.168.1.16:3000", { transports : ['websocket'] });

function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext("2d");

  const [painting, setPainting] = useState(false);
  const [setting, setSetting] = useState({
    color: 'black',
  })

  useEffect(() => {
    socket.on('connect', function() {
      console.log('Connected');
    });
  }, [])

  const startDraw = (event: any) => {
    setPainting(true);
    if (ctx && canvas.current) {
      console.log(event.clientX, event.clientY);
      ctx.beginPath();
      ctx.moveTo(
        event.clientX - canvas.current.offsetLeft,
        event.clientY - canvas.current.offsetTop,
      );
    }
    event.preventDefault();
  }

  const drawing = (event: any) => {
    if (ctx && painting && canvas.current) {
      console.log("event drawing", ctx);
      ctx.lineTo(
        event.clientX - canvas.current.offsetLeft,
        event.clientY - canvas.current.offsetTop,
      );
      ctx.strokeStyle = setting.color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    event.preventDefault();
  }

  const endDraw = (event: any) => {
    setPainting(false);
    event.preventDefault();
  }

  const changeColor = (event: any) => {
    console.log(event);
    setSetting({ ...setting, color: event.target.value });
  }

  return (
    <div className="canvas">
      <canvas
        ref={canvas}
        width="500"
        height="300"
        onMouseDown={startDraw}
        onMouseMove={drawing}
        onMouseUp={endDraw}
      ></canvas>
      <input type="color" value={setting.color} onChange={changeColor} />
    </div>
  );
}

export default Canvas;
