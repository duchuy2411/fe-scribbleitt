import React, { MouseEventHandler } from 'react';
import { Constant } from '../../../constant/index';

interface MainCanvasProp {
  canvas: any,
  startDraw: MouseEventHandler,
  endDraw: MouseEventHandler,
  drawing: MouseEventHandler,
};

const MainCanvas = (props: MainCanvasProp) => {
  const {
    canvas, startDraw, drawing, endDraw
  } = props;

  return (
    <canvas className="w-582 h-442 w-min-582 h-min-442 bg-white my-2" 
      ref={canvas}
      width={Constant.canvasWidth}
      height={Constant.canvasHeight}
      onMouseDown={startDraw}
      onMouseMove={drawing}
      onMouseUp={endDraw}
  ></canvas>
  )
}

export default MainCanvas;
