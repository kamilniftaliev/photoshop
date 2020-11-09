import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FileSaver from 'file-saver';

import Painter from './Painter';

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
  saveDrawingRequest,
  loadDrawingFromFileRequest,
} from 'actions';

// Selectors
import {
  brushSizeSelector,
  colorSelector,
  selectedToolSelector,
  zoomLevelSelector,
  previousDrawingPointsSelector,
  pointsSelector,
} from 'selectors';

// Types
import { Point, SettingsState } from 'types';

// Utils
import {
  downloadJSONFileWithDrawing,
  saveCanvasAsImage,
  readDrawingFromJSON,
} from 'utils';

const Container = styled.main`
  display: grid;
  grid-template-areas:
    'options options options'
    'tools canvas properties';
  grid-template-columns: var(--tools-panel-width) 1fr var(
      --properties-panel-width
    );
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

interface DrawProps {
  toggleDarkMode: () => void;
  darkMode: SettingsState['darkMode'];
}

export default function Draw({ toggleDarkMode, darkMode }: DrawProps) {
  const canvasElement = useRef(null);
  const painter = useRef(null);
  const dispatch = useDispatch();

  // Local state
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Selectors from redux store
  const selectedTool = useSelector(selectedToolSelector);
  const color = useSelector(colorSelector);
  const brushSize = useSelector(brushSizeSelector);
  const zoomLevel = useSelector(zoomLevelSelector);
  const previousDrawingPoints = useSelector(previousDrawingPointsSelector);
  const initialPoints = useSelector(pointsSelector, () => true);

  const selectTool = useCallback(
    (selectedTool: Point['tool']) => dispatch(selectToolRequest(selectedTool)),
    []
  );

  const setColor = useCallback(
    (color: Point['color']) => dispatch(setColorRequest(color)),
    []
  );

  const setBrushSize = useCallback(
    (brushSize: Point['brushSize']) => dispatch(setBrushSizeRequest(brushSize)),
    []
  );

  const setZoomLevel = useCallback(
    (zoomLevel: SettingsState['zoomLevel']) =>
      dispatch(setZoomLevelRequest(zoomLevel)),
    []
  );

  // Save drawing to the store (+ to the storage)
  // and toggle undo/redo buttons
  const saveDrawing = useCallback(({ points, canUndo, canRedo }) => {
    dispatch(saveDrawingRequest(points));
    setCanUndo(canUndo);
    setCanRedo(canRedo);
  }, []);

  // Load a drawing from JSON file
  const loadDrawingFromFile = useCallback((points: Point[]) => {
    dispatch(loadDrawingFromFileRequest(points));
  }, []);

  // Painter's undo caller
  const undo = useCallback(() => painter.current.undo(), [painter]);

  // Painter's redo caller
  const redo = useCallback(() => painter.current.redo(), [painter]);

  // Download current drawing as JSON
  const exportToJSON = useCallback(() => {
    downloadJSONFileWithDrawing(painter.current.getPoints());
  }, [painter]);

  // Import JSON file and apply it
  const importJSON = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      readDrawingFromJSON(event, loadDrawingFromFile);
    },
    [painter]
  );

  // Save the drawing as PNG image
  const saveAsImage = useCallback(() => {
    saveCanvasAsImage(canvasElement.current);
  }, [painter]);

  // Initialize Painter on first mount
  useEffect(() => {
    painter.current = new Painter({
      element: canvasElement.current,
      points: initialPoints,
      saveDrawing,
    });

    return painter.current.beforeDestroy;
  }, []);

  // Update painter state when tool, color, brush size
  // are changed or an old drawing got applied
  useEffect(() => {
    painter.current.setConfig({
      selectedTool,
      color,
      brushSize,
      points: previousDrawingPoints,
    });
  }, [selectedTool, color, brushSize, previousDrawingPoints]);

  const scale = zoomLevel / 100;

  return (
    <Container>
      <Tools
        selectedTool={selectedTool as Point['tool']}
        setSelectedTool={selectTool}
      />
      <CanvasContainer>
        <CanvasElement scale={scale} ref={canvasElement} />
      </CanvasContainer>
      <Properties color={color as Point['color']} setColor={setColor} />
      <Options
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        brushSize={brushSize as Point['brushSize']}
        setBrushSize={setBrushSize}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        exportToJSON={exportToJSON}
        saveAsImage={saveAsImage}
        importJSON={importJSON}
      />
    </Container>
  );
}
