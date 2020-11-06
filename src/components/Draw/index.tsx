import React, { useEffect, useState, useRef, RefObject } from 'react';
import styled from 'styled-components';

import Painter from './Painter';

export default function Draw() {
  // const [canvas, setCanvas] = useRef<HTMLCanvasElement>(null);
  const [painter, setPainter] = useState<Object>(null);

  // useEffect(() => {
  //   if (canvas?.current) {
  //     setPainter(new Painter(canvas.current));
  //   }
  // }, [canvas]);

  const initPainter = (element) => {
    console.log('element', element);
    if (element && !painter) {
      setPainter(new Painter(element));
    }
  };

  console.log('painter', painter);
  // console.log('canvas', canvas);

  return (
    <main>
      <canvas ref={initPainter} width="1000" height="1000"></canvas>
    </main>
  );
}
