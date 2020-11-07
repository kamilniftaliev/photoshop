import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #282828;
`;

const CanvasElement = styled.canvas`
  background-color: #fff;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.6);

  width: calc(100vmin - 350px);
  height: calc(75vmin - 350px);
`;

export default function Canvas({ onMount }) {
  const canvasElement = useRef(null);
  useEffect(() => {
    onMount(canvasElement.current);
  }, []);

  return (
    <Container>
      <CanvasElement ref={canvasElement} />
    </Container>
  );
}
