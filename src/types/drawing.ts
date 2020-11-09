import { Point } from 'types';

export const SAVE_DRAWING = 'SAVE_DRAWING';
export const LOAD_DRAWING_FROM_SESSION = 'LOAD_DRAWING_FROM_SESSION';
export const LOAD_DRAWING_FROM_FILE = 'LOAD_DRAWING_FROM_FILE';
export const SAVE_DRAWING_REQUESTED = 'SAVE_DRAWING_REQUESTED';
export const LOAD_DRAWING_FROM_SESSION_REQUESTED = 'LOAD_DRAWING_FROM_SESSION_REQUESTED';
export const LOAD_DRAWING_FROM_FILE_REQUESTED = 'LOAD_DRAWING_FROM_FILE_REQUESTED';

export interface DrawingState {
  points: Point[];
  loadedPreviousSession: boolean;
}

export interface SaveDrawingAction {
  type: typeof SAVE_DRAWING;
  payload: DrawingState['points'];
}

export interface LoadDrawingFromSessionAction {
  type: typeof LOAD_DRAWING_FROM_SESSION;
  payload: DrawingState['points'];
}

export interface LoadDrawingFromFile {
  type: typeof LOAD_DRAWING_FROM_FILE;
  payload: DrawingState['points'];
}

export type DrawingActions = SaveDrawingAction | LoadDrawingFromSessionAction | LoadDrawingFromFile;
