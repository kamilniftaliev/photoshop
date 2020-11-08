// Types
import { Point } from '../types/interfaces';

export const selectToolRequest = (tool: string) => {
  return {
    type: 'SELECT_TOOL_REQUESTED',
    payload: tool,
  }
}

export const setColorRequest = (color: Point['color']) => {
  return {
    type: 'SET_COLOR_REQUESTED',
    payload: color,
  }
}

export const setBrushSizeRequest = (size: number) => {
  return {
    type: 'SET_BRUSH_SIZE_REQUESTED',
    payload: size,
  }
}

export const setZoomLevelRequest = (size: number) => {
  return {
    type: 'SET_ZOOM_LEVEL_REQUESTED',
    payload: size,
  }
}

export const toggleDarkModeRequest = () => {
  return {
    type: 'TOGGLE_DARK_MODE_REQUESTED',
  }
}

export const saveDrawingRequest = (points: Point[]) => {
  return {
    type: 'SAVE_DRAWING_REQUESTED',
    payload: points
  }
}

export const loadPointsRequest = () => {
  return {
    type: 'LOAD_POINTS_REQUESTED',
  }
}