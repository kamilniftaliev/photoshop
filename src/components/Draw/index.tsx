import React, { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Painter from './Painter';

// Components
import Tools from './Panels/Tools';
import Properties from './Panels/Properties';
import Options from './Panels/Options';
import Canvas from './Canvas';

// Actions
import {
  selectToolRequest,
  setColorRequest,
  setBrushSizeRequest,
  setZoomLevelRequest,
  toggleDarkModeRequest,
} from '../../actions';

const Container = styled.main`
  display: grid;
  grid-template-areas:
    'options options options'
    'tools canvas properties';
  grid-template-columns: var(--tools-panel-width) 1fr 250px;
  grid-template-rows: auto 1fr;
  height: 100%;
`;

export default function Draw() {
  const painter = useRef(null);
  const dispatch = useDispatch();
  const selectedTool = useSelector((state) => state.selectedTool);
  const color = useSelector((state) => state.color);
  const brushSize = useSelector((state) => state.brushSize);
  const zoomLevel = useSelector((state) => state.zoomLevel);
  const darkMode = useSelector((state) => state.darkMode);

  console.log('painter', painter.current);

  const selectTool = useCallback(
    (payload: string) => dispatch(selectToolRequest(payload)),
    [dispatch]
  );

  const setColor = useCallback(
    (payload: string) => dispatch(setColorRequest(payload)),
    [dispatch]
  );

  const setBrushSize = useCallback(
    (payload: number) => dispatch(setBrushSizeRequest(payload)),
    [dispatch]
  );

  const setZoomLevel = useCallback(
    (payload: number) => dispatch(setZoomLevelRequest(payload)),
    [dispatch]
  );

  const toggleDarkMode = useCallback(() => dispatch(toggleDarkModeRequest()), [
    dispatch,
  ]);

  useEffect(() => {
    painter.current.setConfig({
      selectedTool,
      color,
      brushSize,
      zoomLevel,
    });
  }, [selectedTool, color, brushSize, zoomLevel]);

  useEffect(() => {
    const toggleAction = darkMode ? 'remove' : 'add';

    document.documentElement.classList[toggleAction]('light-theme');
  }, [darkMode]);

  return (
    <Container>
      <Tools selectedTool={selectedTool} setSelectedTool={selectTool} />
      <Canvas
        zoomLevel={zoomLevel}
        onMount={(element) => {
          painter.current = new Painter(element);
          console.log('painter.current', painter.current);
        }}
      />
      <Properties color={color} setColor={setColor} />
      <Options
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </Container>
  );
}
