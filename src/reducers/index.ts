import { PainterState } from '../types/interfaces';

interface StoreType {
  selectedTool: PainterState['selectedTool'];
  brushSize: PainterState['brushSize'];
  zoomLevel: number;
  darkMode: boolean;
  points?: PainterState['points'];
  color: PainterState['color'];
  loadedPreviousSession?: boolean;
}

const darkMode = localStorage.getItem('darkMode');

const initialState: StoreType = {
  selectedTool: 'pen',
  brushSize: 10,
  zoomLevel: 100,
  darkMode: !!darkMode,
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
}

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'SELECT_TOOL':
      return {
        ...state,
        selectedTool: payload,
      }

    case 'SET_COLOR':
      return {
        ...state,
        color: payload,
      }

    case 'SET_BRUSH_SIZE':
      return {
        ...state,
        brushSize: payload,
      }

    case 'SET_ZOOM_LEVEL':
      return {
        ...state,
        zoomLevel: payload,
      }

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      }

    case 'SAVE_DRAWING':
      return {
        ...state,
        points: payload,
        loadedPreviousSession: false,
      }

    case 'LOAD_DRAWING_FROM_SESSION':
    case 'LOAD_DRAWING_FROM_FILE':
      return {
        ...state,
        points: payload,
        loadedPreviousSession: true,
      }

    default:
      return state
  }
}

export default rootReducer