import {
  DrawingState,
  SAVE_DRAWING,
  LOAD_DRAWING_FROM_SESSION,
  LOAD_DRAWING_FROM_FILE,
  DrawingActions,
} from 'types';

const initialState: DrawingState = {
  points: [],
  loadedPreviousSession: false,
};

export default function reducer(
  state = initialState,
  { type, payload }: DrawingActions
) {
  switch (type) {
    case SAVE_DRAWING:
      return {
        ...state,
        points: payload,
        loadedPreviousSession: false,
      };

    case LOAD_DRAWING_FROM_SESSION:
    case LOAD_DRAWING_FROM_FILE:
      return {
        ...state,
        points: payload,
        loadedPreviousSession: true,
      };

    default:
      return state;
  }
}
