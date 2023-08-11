import React from "react";
import { DrawingAction } from "./DrawingArea";
import { Row } from "../styled/Containers";
import { SquareButton, SquareButtonIcon } from "../styled/Input";

interface IActionSetProps {
  onDrawingActionChange: (newDrawingAction: DrawingAction) => void;
  undo: () => void;
  redo: () => void;
}
export const ActionSet = ({
  onDrawingActionChange,
  undo,
  redo,
}: IActionSetProps) => {
  return (
    <Row>
      <SquareButton
        size={32}
        onClick={() => onDrawingActionChange(DrawingAction.POINT)}
      >
        <SquareButtonIcon src={require("../assets/point.png")} />
      </SquareButton>
      <SquareButton
        size={32}
        onClick={() => onDrawingActionChange(DrawingAction.LINE)}
      >
        <SquareButtonIcon src={require("../assets/line.png")} />
      </SquareButton>
      <SquareButton
        size={32}
        onClick={() => onDrawingActionChange(DrawingAction.RECTANGLE)}
      >
        <SquareButtonIcon src={require("../assets/rectangle.png")} />
      </SquareButton>
      <SquareButton
        size={32}
        onClick={() => onDrawingActionChange(DrawingAction.CIRCLE)}
      >
        <SquareButtonIcon src={require("../assets/circle.png")} />
      </SquareButton>
      <SquareButton style={{ marginLeft: 32 }} size={32} onClick={undo}>
        <SquareButtonIcon src={require("../assets/undo.png")} />
      </SquareButton>
      <SquareButton size={32} onClick={redo}>
        <SquareButtonIcon src={require("../assets/redo.png")} />
      </SquareButton>
    </Row>
  );
};
