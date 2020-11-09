import { RootState } from 'store';

export const selectedToolSelector = (state: RootState) => state.painter.selectedTool;

export const colorSelector = (state: RootState) => state.painter.color;

export const brushSizeSelector = (state: RootState) => state.painter.brushSize;