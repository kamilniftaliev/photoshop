import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Painter, { saveCallbackProps } from './Painter';

// Components
import Tools from './Panels/Tools';
import Properties from './Panels/Properties';
import Options from './Panels/Options';

// Actions
import {
  selectToolRequest,
  setColorRequest,
  setBrushSizeRequest,
  setZoomLevelRequest,
  toggleDarkModeRequest,
  saveDrawingRequest,
} from 'actions';

// Types
import { Point } from 'types/interfaces';
import { RootState } from 'store';

const Container = styled.main`
  display: grid;
  grid-template-areas:
    'options options options'
    'tools canvas properties';
  grid-template-columns: var(--tools-panel-width) 1fr 250px;
  grid-template-rows: auto 1fr;
  height: 100%;
`;

const CanvasContainer = styled.article`
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

export default function Draw() {
  const painter = useRef(null);
  const canvasElement = useRef(null);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const dispatch = useDispatch();
  const selectedTool = useSelector((state: RootState) => state.selectedTool);
  const color = useSelector((state: RootState) => state.color);
  const brushSize = useSelector((state: RootState) => state.brushSize);
  const zoomLevel = useSelector((state: RootState) => state.zoomLevel);
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const previousDrawingPoints = useSelector((state: RootState) =>
    state.loadedPreviousSession ? state.points : null
  );

  const selectTool = useCallback(
    (selectedTool: string) => dispatch(selectToolRequest(selectedTool)),
    []
  );

  const setColor = useCallback(
    (color: Point['color']) => dispatch(setColorRequest(color)),
    []
  );

  const setBrushSize = useCallback(
    (brushSize: number) => dispatch(setBrushSizeRequest(brushSize)),
    []
  );

  const setZoomLevel = useCallback(
    (zoomLevel: number) => dispatch(setZoomLevelRequest(zoomLevel)),
    []
  );

  const toggleDarkMode = useCallback(
    () => dispatch(toggleDarkModeRequest()),
    []
  );

  const saveDrawing = useCallback(
    ({ points, canUndo, canRedo }: saveCallbackProps) => {
      dispatch(saveDrawingRequest(points));
      setCanUndo(canUndo);
      setCanRedo(canRedo);
    },
    []
  );

  const undo = useCallback(() => painter.current.undo(), [painter]);
  const redo = useCallback(() => painter.current.redo(), [painter]);

  useEffect(() => {
    painter.current = new Painter({
      element: canvasElement.current,
      saveDrawing,
    });

    return painter.current.beforeDestroy;
  }, []);

  useEffect(() => {
    painter.current.setConfig({
      selectedTool,
      color,
      brushSize,
      points: previousDrawingPoints,
    });
  }, [selectedTool, color, brushSize, previousDrawingPoints]);

  useEffect(() => {
    const toggleAction = darkMode ? 'remove' : 'add';

    document.documentElement.classList[toggleAction]('light-theme');
  }, [darkMode]);

  const scale = zoomLevel / 100;

  return (
    <Container>
      <Tools selectedTool={selectedTool} setSelectedTool={selectTool} />
      <CanvasContainer>
        <CanvasElement scale={scale} ref={canvasElement} />
      </CanvasContainer>
      <Properties color={color} setColor={setColor} />
      <Options
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </Container>
  );
}
