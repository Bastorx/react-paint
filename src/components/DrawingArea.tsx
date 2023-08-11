import React, { useCallback, useMemo } from "react";
import { Canvas } from "../styled/Canvas";
import { Row } from "../styled/Containers";
import { drawPoint } from "../utils/drawing-action";

export enum DrawingAction {
  POINT,
  LINE,
  RECTANGLE,
  CIRCLE,
}
interface IDrawingAreaProps {
  color: string;
  drawingAction: DrawingAction;
}
export const DrawingArea = ({ color, drawingAction }: IDrawingAreaProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);

  const onMouseDown = (event: any) => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setIsDrawing(true);
    console.log(
      "clientX",
      event.clientX,
      "clientY",
      event.clientY,
      "left",
      canvasRect.left,
      "top",
      canvasRect.top,
    );
    const { x, y } = {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top,
    };
    drawPoint(canvasRef.current.getContext("2d")!, x, y, color);
  };

  const onMouseMove = (event: any) => {
    if (isDrawing && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const { x, y } = {
        x: event.clientX - canvasRect.left,
        y: event.clientY - canvasRect.top,
      };
      drawPoint(canvasRef.current.getContext("2d")!, x, y, color);
    }
  };

  return (
    <Row>
      <Canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={onMouseDown}
        onMouseUp={() => setIsDrawing(false)}
        onMouseMove={onMouseMove}
      />
    </Row>
  );
};
