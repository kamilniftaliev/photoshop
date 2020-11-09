import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FileSaver from 'file-saver';

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
  saveDrawingRequest,
  LoadDrawingFromFileRequest,
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
import { Point } from 'types';

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

function generateFilename(): string {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = `${date.getHours()}-${date.getMinutes()}`;
  const filename = `Drawing - ${day}.${month}.${year} ${time}`;

  return filename;
}

interface DrawProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Draw({ toggleDarkMode, darkMode }: DrawProps) {
  const painter = useRef(null);
  const dispatch = useDispatch();
  const canvasElement = useRef(null);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

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
    (zoomLevel: number) => dispatch(setZoomLevelRequest(zoomLevel)),
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

  const LoadDrawingFromFile = useCallback((points: Point[]) => {
    dispatch(LoadDrawingFromFileRequest(points));
  }, []);

  const undo = useCallback(() => painter.current.undo(), [painter]);
  const redo = useCallback(() => painter.current.redo(), [painter]);

  const exportToJSON = useCallback(() => {
    const points = painter.current.getPoints();

    const blob = new Blob([JSON.stringify(points)], {
      type: 'application/json;charset=utf-8',
    });

    FileSaver.saveAs(blob, `${generateFilename()}.json`);
  }, [painter]);

  const importJSON = useCallback(
    (event) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const points = JSON.parse(event.target.result as string);

        if (points.length) {
          LoadDrawingFromFile(points);
        }
      };
      reader.readAsText(event.target.files[0]);
    },
    [painter]
  );

  const saveAsImage = useCallback(() => {
    canvasElement.current.toBlob((blob) =>
      FileSaver.saveAs(blob, `${generateFilename()}.png`)
    );
  }, [painter]);

  useEffect(() => {
    painter.current = new Painter({
      element: canvasElement.current,
      points: initialPoints,
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
        exportToJSON={exportToJSON}
        saveAsImage={saveAsImage}
        importJSON={importJSON}
      />
    </Container>
  );
}
