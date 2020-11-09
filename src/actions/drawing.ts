// Types
import {
  DrawingState,
  SAVE_DRAWING_REQUESTED,
  LOAD_DRAWING_FROM_SESSION_REQUESTED,
  LOAD_DRAWING_FROM_FILE_REQUESTED,
} from 'types';

export const saveDrawingRequest = (points: DrawingState['points']) => {
  return {
    type: SAVE_DRAWING_REQUESTED,
    payload: points,
  };
};

export const loadDrawingFromSessionRequest = () => {
  return {
    type: LOAD_DRAWING_FROM_SESSION_REQUESTED,
  };
};

export const LoadDrawingFromFileRequest = (points: DrawingState['points']) => {
  return {
    type: LOAD_DRAWING_FROM_FILE_REQUESTED,
    payload: points,
  };
};
