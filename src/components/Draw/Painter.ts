interface IPath {
  x: number;
  y: number;
}

interface IPoint {
  path: IPath[];
  start: IPath;
}

const points: IPoint[] = [];

export default class Painter {
  private el: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  state = {
    isDrawing: false,
    points,
  };

  constructor(element: HTMLCanvasElement) {
    this.el = element;

    this.context = this.el.getContext('2d');

    this.context.lineWidth = 10;
    this.context.lineJoin = this.context.lineCap = 'round';

    this.bindEvents();
  }

  /**
   * React like setState method that
   * updates the state and calls the render
   */
  private setState = (newState: Object) => {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  };

  private bindEvents() {
    this.el.onmousedown = this.startDrawing;
    this.el.onmousemove = this.draw;
    this.el.onmouseup = this.stopDrawing;
  }

  private stopDrawing = () => {
    this.setState({ isDrawing: false });
  };

  private startDrawing = (event) => {
    this.addPoint(event.clientX, event.clientY);
  };

  private clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  private draw = (event) => {
    const { isDrawing } = this.state;

    if (!isDrawing) return;

    this.addPathToPoint(event.clientX, event.clientY);
  };

  private addPathToPoint = (x, y) => {
    const { points } = this.state;

    const previousPoints = points.slice(0, -1);
    const lastPoint = points[points.length - 1];

    this.setState({
      points: [
        ...previousPoints,
        {
          ...lastPoint,
          path: [...lastPoint.path, { x, y }],
        },
      ],
    });
  };

  private addPoint = (x, y) => {
    const { points } = this.state;

    this.setState({
      points: [
        ...points,
        {
          start: { x, y },
          path: [],
        }
      ],
      isDrawing: true,
    });
  };

  private render() {
    const { points } = this.state;

    const lastPoint = points[points.length - 1];

    if (!lastPoint) return;

    this.context.beginPath();
    this.context.moveTo(lastPoint.start.x, lastPoint.start.y);

    const lines =
      lastPoint.path.length ? lastPoint.path : [lastPoint.start];

    for (var i = 0; i < lines.length; i++) {
      this.context.lineTo(lines[i].x, lines[i].y);
    }

    this.context.stroke();
  }
}
