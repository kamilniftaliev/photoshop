interface IPath {
  x: number;
  y: number;
}

interface IPoint {
  path: IPath[];
  start: IPath;
}

interface ISize {
  width: number;
  height: number;
}

const points: IPoint[] = [];
// const originalCanvasSize: ISize = {
//   width: 0,
//   height: 0,
// };

export default class Painter {
  private el: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private canvasSizeUpdateTimeout: number;

  state = {
    isDrawing: false,
    points,
    selectedTool: 'pen',
    // originalCanvasSize,
  };

  constructor(element: HTMLCanvasElement) {
    this.el = element;

    this.context = this.el.getContext('2d');

    this.bindEvents();

    setTimeout(() => {
      this.state.selectedTool = 'eraser';
    }, 3000);
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

    const { points } = this.state;

    const lastPoint = points[points.length - 1];

    if (lastPoint) {
      this.renderPoint(lastPoint);
    }
  };

  private bindEvents() {
    this.el.onmousedown = this.startDrawing;
    this.el.onmousemove = this.draw;
    this.el.onmouseup = this.stopDrawing;
    window.onresize = this.updateCanvasSize;
    this.updateCanvasSize();
  }

  private updateCanvasSize = () => {
    clearTimeout(this.canvasSizeUpdateTimeout);
    this.canvasSizeUpdateTimeout = setTimeout(() => {
      this.el.removeAttribute('width');
      this.el.removeAttribute('height');
      const cs = getComputedStyle(this.el);
      this.el.width = parseInt(cs.width, 10);
      this.el.height = parseInt(cs.height, 10);

      this.renderAllPoints();
    }, 200);
  };

  // private setCanvasSize = () => {
  //   const canvasContainer = this.el.parentElement;
  //   const prevElement = canvasContainer.previousElementSibling;
  //   const nextElement = canvasContainer.nextElementSibling;

  //   const windowRatio = window.innerHeight / window.innerWidth;

  //   const canvasWidth =
  //     window.innerWidth -
  //     prevElement?.offsetWidth -
  //     nextElement?.offsetWidth -
  //     20;

  //   const canvasHeight = window.innerHeight * windowRatio;

  //   this.el.width = canvasWidth;
  //   this.el.height = canvasHeight;

  //   return {
  //     width: canvasWidth,
  //     height: canvasHeight,
  //   };
  // };

  private stopDrawing = () => {
    this.setState({ isDrawing: false });
  };

  private getPointFromEvent(event): IPath {
    const elementBounds = this.el.getBoundingClientRect();

    const x = event.clientX - elementBounds.x;
    const y = event.clientY - elementBounds.y;

    return { x, y };
  }

  private startDrawing = (event) => {
    const point = this.getPointFromEvent(event);

    this.addPoint(point.x, point.y);
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
    const { isDrawing, selectedTool } = this.state;

    if (!isDrawing) return;

    const point = this.getPointFromEvent(event);

    this.addPathToPoint(point.x, point.y);
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
    const { points, selectedTool } = this.state;

    this.setState({
      points: [
        ...points,
        {
          tool: selectedTool,
          start: { x, y },
          path: [],
        },
      ],
      isDrawing: true,
    });
  };

  private renderPoint = ({ start, path, tool }) => {
    if (tool === 'eraser') {
      this.context.globalCompositeOperation = 'destination-out';
    } else {
      this.context.globalCompositeOperation = 'source-over';
    }

    this.context.lineWidth = 10;
    this.context.lineJoin = this.context.lineCap = 'round';

    this.context.beginPath();
    this.context.moveTo(start.x, start.y);

    const lines = path.length ? path : [start];

    for (var i = 0; i < lines.length; i++) {
      this.context.lineTo(lines[i].x, lines[i].y);
    }

    this.context.stroke();
  };

  private renderAllPoints() {
    const { points } = this.state;

    points.forEach(this.renderPoint);
  }
}
