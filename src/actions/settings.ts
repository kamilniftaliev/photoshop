import {
  SET_ZOOM_LEVEL_REQUESTED,
  TOGGLE_DARK_MODE_REQUESTED,
  SettingsState,
} from 'types';

export const setZoomLevelRequest = (size: SettingsState['zoomLevel']) => {
  return {
    type: SET_ZOOM_LEVEL_REQUESTED,
    payload: size,
  };
};

export const toggleDarkModeRequest = () => {
  return {
    type: TOGGLE_DARK_MODE_REQUESTED,
  };
};
