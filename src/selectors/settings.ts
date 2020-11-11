import { RootState } from 'store';

export const zoomLevelSelector = (state: RootState) => state.settings.zoomLevel;

export const darkModeSelector = (state: RootState) => state.settings.darkMode;
