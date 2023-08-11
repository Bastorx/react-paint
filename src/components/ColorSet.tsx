import React from "react";
import { Color, ColorChangeHandler, SketchPicker } from "react-color";
import { Row } from "../styled/Containers";

interface IColorSetProps {
  color: Color;
  onColorChange: (color: string) => void;
}
export const ColorSet = ({ color, onColorChange }: IColorSetProps) => {
  return (
    <Row>
      <SketchPicker
        color={color}
        onChangeComplete={(color) => onColorChange(color.hex)}
      />
    </Row>
  );
};
