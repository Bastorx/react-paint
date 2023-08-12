import React, { useCallback, useRef, useState } from "react";
import { Column, Container, Row } from "./styled/Containers";
import { DrawingArea } from "./components/DrawingArea";
import { ColorSet } from "./components/ColorSet";
import { ActionSet } from "./components/ActionSet";
import { DrawingAction } from "./utils/drawing.action";
import { SizeSelector } from "./styled/Input";

function App() {
  const drawingAreaRef = useRef<any>(null);
  const [color, setColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(1);
  const [drawingAction, setDrawingAction] = useState<DrawingAction>(
    DrawingAction.TRACE,
  );
  const undo = useCallback(
    async () => await drawingAreaRef.current?.undo(),
    [drawingAreaRef.current],
  );
  const redo = useCallback(
    async () => await drawingAreaRef.current?.redo(),
    [drawingAreaRef.current],
  );
  const clear = useCallback(
    () => drawingAreaRef.current?.clear(),
    [drawingAreaRef.current],
  );
  const onSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value < 1) setSize(1);
    else if (value > 99) setSize(99);
    else setSize(value);
  };

  return (
    <Container>
      <Row>
        <DrawingArea
          color={color}
          size={size}
          drawingAction={drawingAction}
          ref={drawingAreaRef}
        />
        <Column>
          <ColorSet color={color} onColorChange={setColor} />
          <ActionSet
            undo={undo}
            redo={redo}
            clear={clear}
            onDrawingActionChange={setDrawingAction}
          />
          <Row>
            <SizeSelector
              type="number"
              value={size}
              min={1}
              max={99}
              onChange={onSizeChange}
            />
          </Row>
        </Column>
      </Row>
    </Container>
  );
}

export default App;
