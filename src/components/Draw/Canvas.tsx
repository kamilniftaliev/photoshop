import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.article`
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  background-color: #282828;
  overflow: auto;
`;

interface ICanvasProps {
  scale: number;
}

const CanvasElement = styled.canvas<ICanvasProps>`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  margin: auto;
  background-color: #fff;
  box-shadow: 1px 2px 14px 4px rgba(0, 0, 0, 0.6);
  transform: scale(${({ scale }) => scale});
  transform-origin: left top;
`;

interface IProps {
  zoomLevel: number;
  onMount: (element: HTMLCanvasElement) => void;
}

export default function Canvas({ onMount, zoomLevel }: IProps) {
  const canvasElement = useRef(null);

  useEffect(() => {
    onMount(canvasElement.current);
  }, []);

  const scale = zoomLevel / 100;
  console.log('scale', scale);

  return (
    <Container>
      <CanvasElement scale={scale} ref={canvasElement} />
    </Container>
  );
}
