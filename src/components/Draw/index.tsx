import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Painter from './Painter';

// Components
import Tools from './Panels/Tools';
import Properties from './Panels/Properties';
import Options from './Panels/Options';
import Canvas from './Canvas';

const Container = styled.main`
  display: grid;
  grid-template-areas:
    'options options options'
    'tools canvas properties';
  grid-template-columns: 60px 1fr 250px;
  grid-template-rows: 60px 1fr;
  height: 100%;
`;

export default function Draw() {
  const painter = useRef(null);

  console.log('painter', painter);

  return (
    <Container>
      <Tools />
      <Canvas
        onMount={(element) => {
          painter.current = new Painter(element);
        }}
      />
      <Properties />
      <Options />
    </Container>
  );
}
