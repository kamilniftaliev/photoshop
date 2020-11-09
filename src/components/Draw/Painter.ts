import { Path, Point, PainterState } from '../../types/interfaces';

export interface saveCallbackProps {
  points: Point[];
  canUndo: boolean;
  canRedo: boolean;
}

interface PainterProps {
  element: HTMLCanvasElement;
  points: Point[];
  saveDrawing: (data: saveCallbackProps) => void;
}

const initialState: PainterState = {
  isDrawing: false,
  points: [],
  selectedTool: 'pen',
  color: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  brushSize: 10,
  currentPointIndex: -1,
};

export default class Painter {
  #el: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #canvasSizeUpdateTimeout: number;
  #drawingSaver: PainterProps['saveDrawing'];

  #state = initialState;

  constructor({ element, points, saveDrawing }: PainterProps) {
    this.#el = element;
    this.#ctx = this.#el.getContext('2d');
    this.#drawingSaver = saveDrawing;

    this.#bindEvents();

    if (Array.isArray(points) && points.length) {
      this.#setState({
        points,
        currentPointIndex: points.length - 1,
      });
    }
  }

  /**
   * React like setState method that
   * updates the state and calls the render
   */
  #setState = (
    nextState: PainterState,
    callback?: (state?: PainterState) => void
  ) => {
    const prevState = this.#state;

    this.#state = {
      ...prevState,
      ...nextState,
    };

    if (
      typeof nextState.currentPointIndex === 'number' &&
      !Number.isNaN(nextState.currentPointIndex)
    ) {
      this.#renderAllPoints();
    } else {
      this.#state.currentPointIndex = this.#state.points.length - 1;

      const { points } = this.#state;

      const lastPoint = points[points.length - 1];

      if (lastPoint) {
        this.#renderPoint(lastPoint);
      }
    }

    if (typeof callback === 'function') {
      callback(this.#state);
    }
  };

  #bindEvents = () => {
    this.#el.addEventListener('mousedown', this.#startDrawing);
    this.#el.addEventListener('mousemove', this.#draw);
    document.addEventListener('mouseup', this.#stopDrawing);
    document.addEventListener('keyup', this.#handleKeyPress);
    window.addEventListener('resize', this.#updateCanvasSize);
    this.#updateCanvasSize();
  };

  #unbindEvents = () => {
    document.removeEventListener('mouseup', this.#stopDrawing);
    document.removeEventListener('keyup', this.#handleKeyPress);
    window.removeEventListener('resize', this.#updateCanvasSize);
  };

  #handleKeyPress = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 90) {
      if (event.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
    }
  };

  public undo = () => {
    const { currentPointIndex } = this.#state;

    let newCurrentPointIndex = currentPointIndex - 1;

    if (newCurrentPointIndex < -1) {
      newCurrentPointIndex = -1;
    }

    if (newCurrentPointIndex === currentPointIndex) {
      return;
    }

    this.#setState(
      { currentPointIndex: newCurrentPointIndex },
      this.#saveDrawing
    );
  };

  public redo = () => {
    const { points, currentPointIndex } = this.#state;

    let newCurrentPointIndex = currentPointIndex + 1;

    if (newCurrentPointIndex >= points.length) {
      newCurrentPointIndex = points.length - 1;
    }

    if (newCurrentPointIndex === currentPointIndex) {
      return;
    }

    this.#setState(
      { currentPointIndex: newCurrentPointIndex },
      this.#saveDrawing
    );
  };

  #updateCanvasSize = () => {
    clearTimeout(this.#canvasSizeUpdateTimeout);
    this.#canvasSizeUpdateTimeout = setTimeout(() => {
      const parentStyles = getComputedStyle(this.#el.parentElement);

      const parentWidth = parseInt(parentStyles.width, 10);
      const parentHeight = parseInt(parentStyles.height, 10);

      const width = (parentWidth * 95) / 100;
      let height = (width * 70) / 100;

      if (parentHeight < height) {
        height = (parentHeight * 95) / 100;
      }

      this.#el.width = width;
      this.#el.height = height;

      this.#renderAllPoints();
    }, 50);
  };

  #stopDrawing = () => {
    const { isDrawing } = this.#state;

    if (!isDrawing) return;

    this.#setState({ isDrawing: false });

    this.#saveDrawing();
  };

  #saveDrawing = () => {
    const { currentPointIndex, points: allPoints } = this.#state;

    const points = this.#getAvailablePoints();

    if (typeof this.#drawingSaver === 'function') {
      const canUndo = allPoints.length && currentPointIndex >= 0;
      const canRedo =
        allPoints.length && currentPointIndex < allPoints.length - 1;

      this.#drawingSaver({
        points,
        canUndo,
        canRedo,
      });
    }
  };

  #getPointFromEvent = (event): Path => {
    const x = (event.offsetX / this.#el.width) * 100;
    const y = (event.offsetY / this.#el.height) * 100;

    return { x, y };
  };

  #startDrawing = (event) => {
    const point = this.#getPointFromEvent(event);

    this.#addPoint(point.x, point.y);
  };

  #clearCanvas = () => {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
  };

  #draw = (event) => {
    const { isDrawing, points } = this.#state;

    if (!isDrawing) return;

    const point = this.#getPointFromEvent(event);

    const previousPoints = points.slice(0, -1);
    const lastPoint = points[points.length - 1];

    this.#setState({
      points: [
        ...previousPoints,
        {
          ...lastPoint,
          path: [...lastPoint.path, { x: point.x, y: point.y }],
        },
      ],
    });
  };

  #getAvailablePoints = () => {
    const { points, currentPointIndex } = this.#state;

    return points.slice(0, currentPointIndex + 1);
  };

  #addPoint = (x, y) => {
    const { selectedTool, color, brushSize } = this.#state;

    this.#setState({
      points: [
        ...this.#getAvailablePoints(),
        {
          tool: selectedTool,
          start: { x, y },
          path: [],
          color,
          brushSize,
        },
      ],
      isDrawing: true,
    });
  };

  #percToPx = (perc: number, dir: string) => {
    return (perc * this.#el[dir]) / 100;
  };

  #renderPoint = ({ start, path, tool, color, brushSize }: Point) => {
    if (tool === 'eraser') {
      this.#ctx.globalCompositeOperation = 'destination-out';
      this.#ctx.strokeStyle = 'black';
    } else {
      this.#ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
      this.#ctx.globalCompositeOperation = 'source-over';
    }

    this.#ctx.lineWidth = brushSize;
    this.#ctx.lineJoin = this.#ctx.lineCap = 'round';

    this.#ctx.beginPath();
    this.#ctx.moveTo(
      this.#percToPx(start.x, 'width'),
      this.#percToPx(start.y, 'height')
    );

    const lines = path.length ? path : [start];

    for (var i = 0; i < lines.length; i++) {
      this.#ctx.lineTo(
        this.#percToPx(lines[i].x, 'width'),
        this.#percToPx(lines[i].y, 'height')
      );
    }

    this.#ctx.stroke();
  };

  #renderAllPoints = () => {
    this.#clearCanvas();
    this.#ctx.fillStyle = 'white';
    this.#ctx.fillRect(0, 0, this.#el.width, this.#el.height);

    this.#getAvailablePoints().forEach(this.#renderPoint);
  };

  public getPoints = () => {
    return this.#state.points;
  };

  /**
   * setConfig
   */
  public setConfig = ({ selectedTool, color, brushSize, points }): void => {
    let pointsState = null;
    if (Array.isArray(points) && points.length) {
      pointsState = {
        points,
        currentPointIndex: points.length - 1,
      };
    }

    this.#setState(
      {
        selectedTool,
        color,
        brushSize,
        ...pointsState,
      },
      pointsState && this.#saveDrawing
    );
  };

  public beforeDestroy = () => {
    this.#unbindEvents();
  };
}
