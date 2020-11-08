interface IPath {
  x: number;
  y: number;
}

interface IPoint {
  path: IPath[];
  start: IPath;
  tool: string;
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  brushSize: number;
}

interface ISize {
  width: number;
  height: number;
}

interface IState {
  isDrawing?: boolean;
  zoomLevel?: number;
  points?: IPoint[];
  selectedTool?: IPoint['tool'];
  color?: IPoint['color'];
  brushSize?: IPoint['brushSize'];
}

export default class Painter {
  private el: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private canvasSizeUpdateTimeout: number;

  state: IState = {
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
    zoomLevel: 100,
    // originalCanvasSize,
  };

  constructor(element: HTMLCanvasElement) {
    this.el = element;

    this.ctx = this.el.getContext('2d');

    this.bindEvents();
  }

  /**
   * React like setState method that
   * updates the state and calls the render
   */
  private setState = (nextState: IState) => {
    const prevState = this.state;

    this.state = {
      ...prevState,
      ...nextState,
    };

    if (nextState.zoomLevel && prevState.zoomLevel !== nextState.zoomLevel) {
      this.renderAllPoints();
    } else {
      const { points } = this.state;

      const lastPoint = points[points.length - 1];

      if (lastPoint) {
        this.renderPoint(lastPoint);
      }
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
    const { zoomLevel } = this.state;
    // if (zoomLevel !== 100) return;

    clearTimeout(this.canvasSizeUpdateTimeout);
    this.canvasSizeUpdateTimeout = setTimeout(() => {
      const cs = getComputedStyle(this.el.parentElement);
      this.el.width = (parseInt(cs.width, 10) * 95) / 100;
      console.log('this.el.width', this.el.width)
      this.el.height = (this.el.width * 70) / 100;

      this.renderAllPoints();
    }, 50);
  };

  private stopDrawing = () => {
    this.setState({ isDrawing: false });
  };

  private getPointFromEvent(event): IPath {
    const x = (event.offsetX / this.el.width) * 100;
    const y = (event.offsetY / this.el.height) * 100;

    return { x, y };
  }

  private startDrawing = (event) => {
    const point = this.getPointFromEvent(event);

    this.addPoint(point.x, point.y);
  };

  private clearCanvas() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
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
    const { points, selectedTool, color, brushSize } = this.state;

    this.setState({
      points: [
        ...points,
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

  private percToPx(perc: number, dir: string) {
    return (perc * this.el[dir]) / 100;
  }

  private renderPoint = ({ start, path, tool, color, brushSize }: IPoint) => {
    if (tool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.strokeStyle = 'black';
    } else {
      this.ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
      this.ctx.globalCompositeOperation = 'source-over';
    }

    this.ctx.lineWidth = brushSize;
    this.ctx.lineJoin = this.ctx.lineCap = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(
      this.percToPx(start.x, 'width'),
      this.percToPx(start.y, 'height'),
    );

    const lines = path.length ? path : [start];

    for (var i = 0; i < lines.length; i++) {
      this.ctx.lineTo(
        this.percToPx(lines[i].x, 'width'),
        this.percToPx(lines[i].y, 'height'),
      );
    }

    this.ctx.stroke();
  };

  private renderAllPoints() {
    const { points } = this.state;

    points.forEach(this.renderPoint);
  }

  /**
   * setConfig
   */
  public setConfig({ selectedTool, color, brushSize, zoomLevel }) {
    this.setState({ selectedTool, color, brushSize, zoomLevel });
  }
}
