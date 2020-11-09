import { Path, Point, PainterLocalState, PainterProps, DrawingSaverData } from 'types';

const initialState: PainterLocalState = {
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

/** 95% of the parent element's width */
const CANVAS_WIDTH_PERC = 95;
/** Proportional height to the width */
const CANVAS_HEIGHT_PERC = 70;

/**
 * Painter class is the place where
 * everything related to canvas happens
 */
export default class Painter {
  #el: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #canvasSizeUpdateTimeout: number;
  #drawingSaver: PainterProps['saveDrawing'];

  #state = initialState;

  /**
   * Initializes the class, attaches mouse and keyboard events
   * stores callback function for saving drawing and applies
   * the passed points if they're valid
   */
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
   * React-like setState method that
   * updates the state, calls the renderer
   * and calls the callback with new state if needed
   */
  #setState = (
    nextState: PainterLocalState,
    callback?: (state?: PainterLocalState) => void
  ) => {
    this.#state = {
      ...this.#state,
      ...nextState,
    };

    /**
     * If currentPointIndex has changed, meaning
     * Undo/Redo buttons were clicked, render
     * all points
     */
    if (
      typeof nextState.currentPointIndex === 'number' &&
      !Number.isNaN(nextState.currentPointIndex)
    ) {
      this.#renderAllPoints();
    } else {
      // If it's just a regular drawing, render only last point
      this.#state.currentPointIndex = this.#state.points.length - 1;

      const { points } = this.#state;

      const lastPoint = points[points.length - 1];

      if (lastPoint) {
        this.#renderPoint(lastPoint);
      }
    }

    // React-like callback function
    if (typeof callback === 'function') {
      callback(this.#state);
    }
  };

  /**
   * Attach events to the canvas element and to DOM
   */
  #bindEvents = () => {
    this.#el.addEventListener('mousedown', this.#startDrawing);
    this.#el.addEventListener('mousemove', this.#draw);
    document.addEventListener('mouseup', this.#stopDrawing);
    document.addEventListener('keyup', this.#handleKeyPress);
    window.addEventListener('resize', this.#setCanvasSize);

    // Call canvas size setter for the first time
    this.#setCanvasSize();
  };

  /**
   * Detach events
   */
  #unbindEvents = () => {
    document.removeEventListener('mouseup', this.#stopDrawing);
    document.removeEventListener('keyup', this.#handleKeyPress);
    window.removeEventListener('resize', this.#setCanvasSize);
  };

  /**
   * Listens to keyboard and:
   * 1. if Ctrl/CMD + Z are pressed - calls undo
   * 2. if Ctrl/CMD + Shift + Z are pressed - calls redo
   */
  #handleKeyPress = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyZ') {
      if (event.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
    }
  };

  /**
   * Reverts back the last added point by
   * moving backwards in the array of points
   */
  public undo = () => {
    const { currentPointIndex } = this.#state;

    let newCurrentPointIndex = currentPointIndex - 1;

    // If we've reached the starting point, stop going back
    if (newCurrentPointIndex < -1) {
      newCurrentPointIndex = -1;
    }

    // If the index is same, don't do anything
    if (newCurrentPointIndex === currentPointIndex) {
      return;
    }

    // Update the index and call saver function
    this.#setState(
      { currentPointIndex: newCurrentPointIndex },
      this.#saveDrawing
    );
  };

  /**
   * Moves the focus forwards in the array of points
   */
  public redo = () => {
    const { points, currentPointIndex } = this.#state;

    let newCurrentPointIndex = currentPointIndex + 1;

    // If we've reached to the end, stop incrementing the index
    if (newCurrentPointIndex >= points.length) {
      newCurrentPointIndex = points.length - 1;
    }

    // If the index is same, don't do anything
    if (newCurrentPointIndex === currentPointIndex) {
      return;
    }

    // Update the index and call saver function
    this.#setState(
      { currentPointIndex: newCurrentPointIndex },
      this.#saveDrawing
    );
  };

  /**
   * Sets the "width" and "height" attributes on
   * the canvas element according to sizes of the parent
   * */
  #setCanvasSize = () => {
    // Debounce the function to not execute it
    // on each window resize event
    clearTimeout(this.#canvasSizeUpdateTimeout);
    this.#canvasSizeUpdateTimeout = setTimeout(() => {
      const parentStyles = getComputedStyle(this.#el.parentElement);

      const parentWidth = parseInt(parentStyles.width, 10);
      const parentHeight = parseInt(parentStyles.height, 10);

      const width = (parentWidth * CANVAS_WIDTH_PERC) / 100;
      let height = (width * CANVAS_HEIGHT_PERC) / 100;

      // If the canvas will be higher than
      // parent's height, make it fit
      if (parentHeight < height) {
        height = (parentHeight * CANVAS_WIDTH_PERC) / 100;
      }

      this.#el.width = width;
      this.#el.height = height;

      this.#renderAllPoints();
    }, 50);
  };

  /**
   * Stops painting new points/lines and calls
   * the saver function
   */
  #stopDrawing = () => {
    const { isDrawing } = this.#state;

    if (!isDrawing) return;

    this.#setState({ isDrawing: false });

    this.#saveDrawing();
  };

  /**
   * Gets all points from start to current
   * focused point and calls saver function
   * with those limited range of points
   */
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

  /**
   * Returns coordinates of the point in percentages related
   * to the canvas size. We do that to make every paint
   * responsive on all sizes.
   * @property {number} x - Horizontal position in percentages
   * @property {number} y - Vertical position in percentages
   */
  #getPointFromEvent = (event: MouseEvent): Path => {
    const x = (event.offsetX / this.#el.width) * 100;
    const y = (event.offsetY / this.#el.height) * 100;

    return { x, y };
  };

  /**
   * Add/paint start of a line.
   */
  #startDrawing = (event: MouseEvent) => {
    const point = this.#getPointFromEvent(event);

    this.#addPoint(point.x, point.y);
  };

  /**
   * Clears the canvas from start to end
   */
  #clearCanvas = () => {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
  };

  /**
   * Appends next paths to the starting point
   * and generates a line
   */
  #draw = (event: MouseEvent) => {
    const { isDrawing, points } = this.#state;

    if (!isDrawing) return;

    const point = this.#getPointFromEvent(event);

    const previousPoints = points.slice(0, -1);
    const lastPoint = points[points.length - 1];

    this.#setState({
      points: [
        // Previous lines
        ...previousPoints,
        // New line
        {
          ...lastPoint,
          // Actual path that becomes a line consisting
          // of dots/points
          path: [...lastPoint.path, { x: point.x, y: point.y }],
        },
      ],
    });
  };

  /**
   * Returns range of points/lines/actions from start
   * to current focused edit/action
   */
  #getAvailablePoints = (): PainterProps['points'] => {
    const { points, currentPointIndex } = this.#state;

    return points.slice(0, currentPointIndex + 1);
  };

  /**
   * Creates a new point and adds it as a starting
   * point of a line/path
   */
  #addPoint = (x: Path['x'], y: Path['y']) => {
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

  /**
   * Converts perc to actual pixels in given
   * size direction
   * @param dir - width or height
   */
  #percToPx = (perc: number, dir: string): number => {
    return (perc * this.#el[dir]) / 100;
  };

  /**
   * Renders/Paints a point at given position
   */
  #renderPoint = ({ start, path, tool, color, brushSize }: Point) => {
    // If eraser was selected
    if (tool === 'eraser') {
      // Make it subtract the line from the one below
      this.#ctx.globalCompositeOperation = 'destination-out';
      this.#ctx.strokeStyle = '#ffffff';
    } else {
      // Otherwise if "pen" tool was selected
      // set the color and make it paint over others
      this.#ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
      this.#ctx.globalCompositeOperation = 'source-over';
    }

    // Set brush size
    this.#ctx.lineWidth = brushSize;
    this.#ctx.lineJoin = this.#ctx.lineCap = 'round';

    // Define the starting point
    this.#ctx.beginPath();
    this.#ctx.moveTo(
      this.#percToPx(start.x, 'width'),
      this.#percToPx(start.y, 'height')
    );

    const lines = path.length ? path : [start];

    // Draw until the array of paths (X and Y coordinates)
    // reaches the end
    for (var i = 0; i < lines.length; i++) {
      this.#ctx.lineTo(
        this.#percToPx(lines[i].x, 'width'),
        this.#percToPx(lines[i].y, 'height')
      );
    }

    this.#ctx.stroke();
  };

  /**
   * Clears the canvas and start painting
   * everything from scratch
   */
  #renderAllPoints = () => {
    this.#clearCanvas();
    this.#ctx.fillStyle = 'white';
    this.#ctx.fillRect(0, 0, this.#el.width, this.#el.height);

    this.#getAvailablePoints().forEach(this.#renderPoint);
  };

  /**
   * Public method to access all points from start to end
   */
  public getPoints = () => {
    return this.#state.points;
  };

  /**
   * Public method to update some parts of the state
   */
  public setConfig = ({ selectedTool, color, brushSize, points }): void => {
    let pointsState = null;

    // If valid points were passed, also update
    // current focused point's index
    if (Array.isArray(points) && points.length) {
      pointsState = {
        points,
        currentPointIndex: points.length - 1,
      };
    }

    // Apply new changes
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

  /**
   * Detach events before destroying the class
   */
  public beforeDestroy = () => {
    this.#unbindEvents();
  };
}
