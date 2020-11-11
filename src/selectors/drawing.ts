import { RootState } from 'store';

export const previousDrawingPointsSelector = (state: RootState) =>
  state.drawing.loadedPreviousSession ? state.drawing.points : null;

export const pointsSelector = (state: RootState) => state.drawing.points;
