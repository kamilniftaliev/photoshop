import { Point, SELECT_TOOL_REQUESTED, SET_COLOR_REQUESTED, SET_BRUSH_SIZE_REQUESTED } from 'types';

export const selectToolRequest = (tool: Point['tool']) => {
  return {
    type: SELECT_TOOL_REQUESTED,
    payload: tool,
  }
}

export const setColorRequest = (color: Point['color']) => {
  return {
    type: SET_COLOR_REQUESTED,
    payload: color,
  }
}

export const setBrushSizeRequest = (size: Point['brushSize']) => {
  return {
    type: SET_BRUSH_SIZE_REQUESTED,
    payload: size,
  }
}
