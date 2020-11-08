export const selectToolRequest = (tool: string) => {
  return {
    type: 'SELECT_TOOL_REQUESTED',
    payload: tool,
  }
}

export const setColorRequest = (color: string) => {
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