export interface Path {
  readonly x: number;
  readonly y: number;
}

export interface Point {
  path: Path[];
  start: Path;
  tool: string;
  brushSize: number;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface PainterState {
  isDrawing?: boolean;
  points?: Point[];
  selectedTool?: Point['tool'];
  color?: Point['color'];
  brushSize?: Point['brushSize'];
  currentPointIndex?: number;
}
