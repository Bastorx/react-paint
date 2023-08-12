import React, { memo } from "react";
import { Color, SketchPicker } from "react-color";
import { Row } from "../styled/Containers";

interface IColorSetProps {
  color: Color;
  onColorChange: (color: string) => void;
}
export const ColorSetComponent = ({ color, onColorChange }: IColorSetProps) => {
  return (
    <Row>
      <SketchPicker
        color={color}
        onChangeComplete={(color) => onColorChange(color.hex)}
      />
    </Row>
  );
};

export const ColorSet = memo(ColorSetComponent);
