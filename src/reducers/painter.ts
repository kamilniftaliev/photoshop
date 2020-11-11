import {
  PainterGlobalState,
  PainterActionTypes,
  SELECT_TOOL,
  SET_COLOR,
  SET_BRUSH_SIZE,
} from 'types';

export const painterInitialGlobalState: PainterGlobalState = {
  selectedTool: 'pen',
  brushSize: 10,
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
};

export default function reducer(
  state = painterInitialGlobalState,
  { type, payload }: PainterActionTypes
) {
  switch (type) {
    case SELECT_TOOL:
      return {
        ...state,
        selectedTool: payload,
      };

    case SET_COLOR:
      return {
        ...state,
        color: payload,
      };

    case SET_BRUSH_SIZE:
      return {
        ...state,
        brushSize: payload,
      };

    default:
      return state;
  }
}
