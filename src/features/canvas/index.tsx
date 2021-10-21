// @ts-ignore: Object is possibly 'null'.
import React, { useEffect, useRef, useState } from 'react';

import { SocketContext, useSocketContext } from '../../context';
import { Constant } from '../../constant';

import MainCanvas from './MainCanvas';
import Players  from './Players';
import Status from './Status';
import Chat from './Chat';
import Tools from './Tools';

const src = "https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/241410267_1167499743741183_9020703460558977142_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=LvQ1PjW0SCMAX8sK1nz&_nc_ht=scontent.fsgn5-10.fna&oh=d3d06ea6e627da30deb11a5faa62767f&oe=6195A898";
const player = [
  {
    name: "Huy",
    score: 1200,
  },
  {
    name: "Q",
    score: 1300,
  },
  {
    name: "M",
    score: 1200,
  },
  {
    name: "M",
    score: 1200,
  },
  {
    name: "M",
    score: 1200,
  },
  {
    name: "M",
    score: 1200,
  },
  {
    name: "M",
    score: 1200,
  },
  {
    name: "M",
    score: 1200,
  },
]

function Canvas() {
  const { socket } = useSocketContext();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<any>();
  const [canvasHeight, setCanvasHeight] = useState<any>();

  useEffect(() => {
    if (canvas.current !== undefined) {
      const context = canvas.current?.getContext("2d");
      if (context) {
        setCtx(context);
      }
    }
  }, [ctx]);

  const [socketId, setSocketId] = useState('');
  const [painting, setPainting] = useState(false);
  const [setting, setSetting] = useState({ color: 'black' });
  const [tool, setTool] = useState<String>("");

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
    if (tool === Constant.TOOLS.FILL_COLOR) {
      if (ctx && canvas.current) {
        const x = event.clientX - canvas.current.offsetLeft;
        const y = event.clientY - canvas.current.offsetTop;
        const color = parseRGB(setting.color);
        console.log("==color==:", color);
        paintFill(ctx, x, y, color);
      }
    } else {
      setPainting(true);
      if (ctx && canvas.current) {
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

  const data = (tempctx: any, x: any , y: any) => {
    const result = tempctx.getImageData(x, y, 1, 1).data;
    console.log("==result==", result[0], result[1], result[2], result[3]);
    return result;
  }

  const compareColor = (arr1: any, arr2: any) =>
    arr1[0] === arr2[0] && arr1[1] === arr2[1] && arr1[2] === arr2[2];

  function paintFill(context: any, x: any, y: any, rgb: any) {
    let currentVal = context.getImageData(x, y, 1, 1).data;
    
  }

  const fillColor = () => {
    setTool(Constant.TOOLS.FILL_COLOR);
  }

  const parseRGB = (input: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  return (
    <div className="canvas">
      <div className="flex justify-center items-center bg-yellow-400 h-screen">
        <div className="flex justify-center items-center px-1 my-auto ">
          <Players
            src={src}
            player={player}
          />
          <div className="flex flex-col w-6/12 w-max-582 h-578 border-gray-600 mx-2 rounded-lg">
            <Status />
            <MainCanvas
              canvas={canvas}
              startDraw={startDraw}
              endDraw={endDraw}
              drawing={drawing}
            />
            <Tools />
          </div>
          <Chat />
        </div>
      </div>
      
      {/* <input type="color" value={setting.color} onChange={changeColor} />
      <button onClick={fillColor}>Fill color</button>
      <div>{socketId}</div> */}
    </div>
  );
}

export default Canvas;
