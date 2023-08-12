export const CANVAS_SIZE = {
  WIDTH: 500,
  HEIGHT: 500,
};

export enum DrawingAction {
  TRACE,
  LINE,
  RECTANGLE,
  CIRCLE,
}

export type TPoint = {
  x: number;
  y: number;
};

const comparePoints = (point1: TPoint, point2: TPoint) =>
  point1.x === point2.x && point1.y === point2.y;

export const rewriteCanvas = (
  context: CanvasRenderingContext2D,
  dataUrl: string,
) =>
  new Promise<void>((resolve, reject) => {
    const newCanvasImg = new Image(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
    newCanvasImg.src = dataUrl;
    newCanvasImg.onload = () => {
      context.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
      context.drawImage(newCanvasImg, 0, 0);
      resolve();
    };
    newCanvasImg.onerror = (error) => {
      reject(error);
    };
  });
export const clearCanvas = (context: CanvasRenderingContext2D) => {
  context.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
};
export const drawLine = (
  context: CanvasRenderingContext2D,
  currentPoint: TPoint,
  initialPoint: TPoint,
  color: string,
  size = 1,
) => {
  context.beginPath();
  context.moveTo(initialPoint.x, initialPoint.y);
  context.lineTo(currentPoint.x, currentPoint.y);
  context.lineCap = "round";
  context.lineWidth = size;
  context.strokeStyle = color;
  context.stroke();
};

export const drawRectangle = (
  context: CanvasRenderingContext2D,
  currentPoint: TPoint,
  initialPoint: TPoint,
  color: string,
  size = 1,
) => {
  context.beginPath();
  context.rect(
    Math.min(currentPoint.x, initialPoint.x),
    Math.min(currentPoint.y, initialPoint.y),
    Math.abs(currentPoint.x - initialPoint.x),
    Math.abs(currentPoint.y - initialPoint.y),
  );
  context.lineWidth = size;
  context.strokeStyle = color;
  context.stroke();
};

export const drawCircle = (
  context: CanvasRenderingContext2D,
  currentPoint: TPoint,
  initialPoint: TPoint,
  color: string,
  size = 1,
) => {
  const radiusX = Math.abs(currentPoint.x - initialPoint.x) / 2;
  const radiusY = Math.abs(currentPoint.y - initialPoint.y) / 2;
  context.beginPath();
  context.ellipse(
    Math.min(currentPoint.x, initialPoint.x) + radiusX,
    Math.min(currentPoint.y, initialPoint.y) + radiusY,
    radiusX,
    radiusY,
    0,
    0,
    2 * Math.PI,
  );
  context.lineWidth = size;
  context.strokeStyle = color;
  context.stroke();
};

export const drawTrace = (
  context: CanvasRenderingContext2D,
  currentPoint: TPoint,
  initialPoint: TPoint,
  color: string,
  size = 1,
) => {
  context.beginPath();
  if (true && !comparePoints(currentPoint, initialPoint)) {
    drawLine(context, currentPoint, initialPoint, color, size);
  } else {
    context.fillStyle = color;
    context.arc(
      currentPoint.x,
      currentPoint.y,
      size / 2,
      0 * Math.PI,
      2 * Math.PI,
    );
    context.fill();
  }
};

const drawAction = (drawAction: DrawingAction) => {
  switch (drawAction) {
    case DrawingAction.LINE:
      return drawLine;
      break;
    case DrawingAction.TRACE:
      return drawTrace;
      break;
    case DrawingAction.RECTANGLE:
      return drawRectangle;
      break;
    case DrawingAction.CIRCLE:
      return drawCircle;
      break;
    default:
      throw new Error("Invalid drawing action");
  }
};

export default drawAction;
