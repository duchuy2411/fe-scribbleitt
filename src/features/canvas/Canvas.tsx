import React, { useEffect, useRef, useState } from 'react';
import { SocketContext, useSocketContext } from '../../context';

const canvasWidth = 500;
const canvasHeight = 300;

function Canvas() {
  const { socket } = useSocketContext();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvas.current !== undefined) {
      const context = canvas.current?.getContext("2d");
      if (context) {
        setCtx(context);
      }
    }
  }, [ctx])

  const [socketId, setSocketId] = useState('');
  const [painting, setPainting] = useState(false);
  const [setting, setSetting] = useState({
    color: 'black',
  })

  useEffect(() => {
    socket.on('connect', function() {
      console.log('Connected');
      socket.on('authenticate', (data: any) => {
        setSocketId(data);
      })
    });
    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    socket.on('sendStart', (data: any) => {
      if (ctx && canvas.current) {
        ctx.beginPath();
        ctx.moveTo(data.x - canvas.current.offsetLeft, data.y - canvas.current.offsetTop);
      }
    });
    socket.on('sendDrawing', (data: any) => {
      if (ctx && canvas.current) {
        ctx.lineTo(data.x - canvas.current.offsetLeft, data.y - canvas.current.offsetTop);
        ctx.strokeStyle = setting.color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });
    socket.on('sendEnd', (data: any) => {
      console.log('End');
      setPainting(false);
    });
    return () => {
      socket.off('sendStart')
      socket.off('sendDrawing')
      socket.off('sendEnd')
    }
  }, [socket, canvas.current])

  const startDraw = (event: any) => {
    setPainting(true);
    if (ctx && canvas.current) {
      console.log("===ctx===:", ctx);
      socket.emit("startDraw", { 
        socketId,
        x: event.clientX - canvas.current.offsetLeft,
        y: event.clientY - - canvas.current.offsetTop
      });
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
      ctx.lineTo(
        event.clientX - canvas.current.offsetLeft,
        event.clientY - canvas.current.offsetTop,
      );
      socket.emit("drawing", {
        socketId,
        x: event.clientX - canvas.current.offsetLeft,
        y: event.clientY - canvas.current.offsetTop
      });
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
    socket.emit("endDraw", { socketId });
    event.preventDefault();
  }

  const changeColor = (event: any) => {
    console.log(event);
    setSetting({ ...setting, color: event.target.value });
  }

  function paintFill(context: any, x: any, y: any, rgb: any) {
    let currentVal = context.getImageData(x, y, 1, 1).data;
    // set currentVal to newColor
    const newColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
    context.fillStyle = newColor;
    context.fillRect(x, y, 1, 1);

    // check top, bottom, left and right
    // if they match currentVal, call function with that val's coordinates
    // top
    const data = (tempctx: any, x: any , y: any) => {
      return tempctx.getImageData(x, y, 1, 1).data
    }

    // if (x - 1 >= 0 && data(context, x-1, y) === currentVal) {
    //     paintFill(context, x-1, y, newColor);
    // }
    // // bottom
    // if (x + 1 < context.length && context[x + 1][y] === currentVal) {
    //     paintFill(context, x+1, y, newColor);
    // }
    // // left
    // if (y - 1 >= 0 && context[x][y-1] === currentVal) {
    //     paintFill(context, x, y-1, newColor);
    // }
    // // right
    // if (y + 1 < context[x].length && context[x][y+1] === currentVal) {
    //     paintFill(context, x, y+1, newColor)
    // }
    // return true;
  }

  const testColor = (x: any, y: any, rgb: Array<number>) => {
    if (ctx) {
      console.log()
    }
  }

  return (
    <div className="canvas">
      <canvas
        ref={canvas}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={startDraw}
        onMouseMove={drawing}
        onMouseUp={endDraw}
      ></canvas>
      <input type="color" value={setting.color} onChange={changeColor} />
      <div>{socketId}</div>
      <button onClick={testColor}>fill</button>
    </div>
  );
}

export default Canvas;
