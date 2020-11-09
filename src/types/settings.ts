export const SET_ZOOM_LEVEL = 'SET_ZOOM_LEVEL';
export const SET_ZOOM_LEVEL_REQUESTED = 'SET_ZOOM_LEVEL_REQUESTED';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const TOGGLE_DARK_MODE_REQUESTED = 'TOGGLE_DARK_MODE_REQUESTED';

export interface SettingsState {
  zoomLevel: number;
  darkMode: boolean;
}

export interface setZoomLevelAction {
  type: typeof SET_ZOOM_LEVEL;
  payload: SettingsState['zoomLevel'];
}

export interface toggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
}

export type SettingsAction = toggleDarkModeAction | setZoomLevelAction;
