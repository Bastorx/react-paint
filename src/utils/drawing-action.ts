import { useCallback } from "react";

export const drawPoint = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size = 2,
) => {
  const pointX = Math.round(x);
  const pointY = Math.round(y);

  context.beginPath();
  context.fillStyle = color;
  console.log("Final:", "X:", pointX, "Y: ", pointY);
  context.arc(x, y, size, 0, 2 * Math.PI);
  context.fill();
};
