import { RGBColor } from 'react-color';

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
  /** Horizontal coordinate of the path */
  readonly x: number;

  /** Vertical coordinate of the path */
  readonly y: number;
}

/**
 * A point/line that can be undone
 */
export interface Point {
  /**
   * Array of paths that makes it look like a line
   */
  path: Path[];

  /** Starting point of the line */
  start: Path;

  /** Name of the tool for that particular point */
  tool: 'pen' | 'eraser';

  /**
   * Size/line width of the selected tool.
   * Works both for "pen" and "eraser"
   * */
  brushSize: number;

  /**
   * RGBA color of the "pen" tool
   */
  color: RGBColor;
}

/**
 * Redux related state of the painter
 */
export interface PainterGlobalState {
  selectedTool?: Point['tool'];
  brushSize?: Point['brushSize'];
  color?: Point['color'];
}

export interface PainterLocalState extends PainterGlobalState {
  /**
   * Is mouse pressed?
   */
  isDrawing?: boolean;

  /**
   * Array of points/dots with X and Y coordinates
   */
  points?: Point[];

  /**
   * Index of the last point that we're currently
   * focused on. Gets decremented when undo happens
   * and increments when redo happens
   */
  currentPointIndex?: number;
}

export interface DrawingSaverData {
  points: PainterLocalState['points'];

  /** Whether to disable or enable "Undo" button */
  canUndo: boolean;

  /** Whether to disable or enable "Redo" button */
  canRedo: boolean;
}

export interface PainterProps {
  /**
   * The HTML Canvas element that
   * all the painting will happen
   */
  element: HTMLCanvasElement;

  points: Point[];

  /**
   * The callback function that will save
   * the drawing for future use
   */
  saveDrawing: (data: DrawingSaverData) => void;
}

export type PainterActionTypes =
  | setBrushSizeAction
  | setColorAction
  | selectToolAction;
