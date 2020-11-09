export const SELECT_TOOL_REQUESTED = 'SELECT_TOOL_REQUESTED';
export const SET_COLOR_REQUESTED = 'SET_COLOR_REQUESTED';
export const SET_BRUSH_SIZE_REQUESTED = 'SET_BRUSH_SIZE_REQUESTED';
export const SELECT_TOOL = 'SELECT_TOOL';
export const SET_COLOR = 'SET_COLOR';
export const SET_BRUSH_SIZE = 'SET_BRUSH_SIZE';

export interface setColorAction {
  type: typeof SET_COLOR;
  payload: Point['color'];
}

export interface selectToolAction {
  type: typeof SELECT_TOOL;
  payload: Point['tool'];
}

export interface setBrushSizeAction {
  type: typeof SET_BRUSH_SIZE;
  payload: Point['brushSize'];
}

export interface Path {
  readonly x: number;
  readonly y: number;
}

export interface Point {
  path: Path[];
  start: Path;
  tool: 'pen' | 'eraser';
  brushSize: number;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface PainterGlobalState {
  selectedTool?: Point['tool'];
  brushSize?: Point['brushSize'];
  color?: Point['color'];
}

export interface PainterLocalState extends PainterGlobalState {
  isDrawing?: boolean;
  points?: Point[];
  currentPointIndex?: number;
}

export type PainterActionTypes = setBrushSizeAction | setColorAction | selectToolAction;
