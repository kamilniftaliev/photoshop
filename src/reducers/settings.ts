import {
  SET_ZOOM_LEVEL,
  TOGGLE_DARK_MODE,
  SettingsAction,
  SettingsState,
} from 'types';

const darkMode = localStorage.getItem('darkMode');

const initialState: SettingsState = {
  zoomLevel: 100,
  darkMode: !!darkMode,
};

export default function reducer(
  state = initialState,
  { type, payload }: SettingsAction
) {
  switch (type) {
    case SET_ZOOM_LEVEL:
      return {
        ...state,
        zoomLevel: payload,
      };

    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
}
