interface IRootState {
  selectedTool: string;
  brushSize: number;
  zoomLevel: number;
  darkMode: boolean;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

const initialState: IRootState = {
  selectedTool: 'pen',
  brushSize: 10,
  zoomLevel: 100,
  darkMode: true,
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
}

function counterReducer(state = initialState, { type, payload }) {
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

    default:
      return state
  }
}

export default counterReducer