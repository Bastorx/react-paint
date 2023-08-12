import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
  useEffect,
  memo,
} from "react";
import { Canvas } from "../styled/Canvas";
import { Row } from "../styled/Containers";
import drawAction, {
  CANVAS_SIZE,
  clearCanvas,
  DrawingAction,
  rewriteCanvas,
} from "../utils/drawing.action";

interface IDrawingAreaRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
}
interface IDrawingAreaProps {
  color: string;
  size: number;
  drawingAction: DrawingAction;
}
// eslint-disable-next-line react/display-name
const DrawingAreaComponent = (
  { color, size, drawingAction }: IDrawingAreaProps,
  ref: ForwardedRef<IDrawingAreaRef>,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawInitialPoint, setDrawInitialPoint] = useState({
    x: 0,
    y: 0,
  });
  const [drawHistory, setDrawHistory] = useState<string[]>([]);
  const [drawHistoryIndex, setDrawHistoryIndex] = useState<number>(0);

  useEffect(() => {
    if (canvasRef.current) {
      setDrawHistory([canvasRef.current!.toDataURL()]);
    }
  }, [canvasRef.current]);

  const undo = async () => {
    if (drawHistoryIndex < 9 && drawHistoryIndex < drawHistory.length - 1) {
      const currentIndex = drawHistoryIndex;
      setDrawHistoryIndex((prev) => prev + 1);
      await rewriteCanvas(
        canvasRef.current!.getContext("2d")!,
        drawHistory[currentIndex + 1],
      );
    }
  };

  const redo = async () => {
    if (drawHistoryIndex > 0) {
      const currentIndex = drawHistoryIndex;
      setDrawHistoryIndex((prev) => prev - 1);
      console.log("rewrite canvas", drawHistoryIndex);
      await rewriteCanvas(
        canvasRef.current!.getContext("2d")!,
        drawHistory[currentIndex - 1],
      );
    }
  };

  const clear = () => {
    clearCanvas(canvasRef.current!.getContext("2d")!);
    setDrawHistory((prev) => {
      return [canvasRef.current!.toDataURL(), ...prev].slice(0, 10);
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      undo,
      redo,
      clear,
    }),
    [undo, redo, clear],
  );

  const onMouseDown = (event: any) => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setIsDrawing(true);
    const point = {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top,
    };
    drawAction(drawingAction)(
      canvasRef.current.getContext("2d")!,
      point,
      point,
      color,
      size,
    );
    setDrawInitialPoint(point);
  };

  const onMouseMove = async (event: any) => {
    if (isDrawing && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const point = {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      };
      if (drawingAction !== DrawingAction.TRACE) {
        await rewriteCanvas(
          canvasRef.current!.getContext("2d")!,
          drawHistory[drawHistoryIndex],
        );
      }
      drawAction(drawingAction)(
        canvasRef.current.getContext("2d")!,
        point,
        drawInitialPoint,
        color,
        size,
      );
      if (drawingAction === DrawingAction.TRACE) {
        setDrawInitialPoint(point);
      }
    }
  };

  const onMouseUp = () => {
    setIsDrawing(false);
    setDrawHistory((prev) => {
      if (drawHistoryIndex > 0) {
        prev.slice(0, drawHistoryIndex);
        setDrawHistoryIndex(0);
      }
      return [canvasRef.current!.toDataURL(), ...prev].slice(0, 10);
    });
  };

  return (
    <Row>
      <Canvas
        ref={canvasRef}
        width={CANVAS_SIZE.WIDTH}
        height={CANVAS_SIZE.HEIGHT}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </Row>
  );
};

export const DrawingArea = memo(
  forwardRef<IDrawingAreaRef, IDrawingAreaProps>(DrawingAreaComponent),
);
