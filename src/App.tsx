import React from "react";
import { Column, Container, Row } from "./styled/Containers";
import { DrawingAction, DrawingArea } from "./components/DrawingArea";
import { ColorSet } from "./components/ColorSet";
import { ActionSet } from "./components/ActionSet";

function App() {
  const [color, setColor] = React.useState<string>("#000000");
  const [drawingAction, setDrawingAction] = React.useState<DrawingAction>(
    DrawingAction.POINT,
  );
  const onColorChange = (color: string) => {
    setColor(color);
  };
  return (
    <Container>
      <Row>
        <DrawingArea color={color} drawingAction={drawingAction} />
        <Column>
          <ColorSet color={color} onColorChange={onColorChange} />
          <ActionSet
            undo={() => {
              console.log("undo");
            }}
            redo={() => {
              console.log("redo");
            }}
            onDrawingActionChange={(newDrawingAction: DrawingAction) =>
              setDrawingAction(newDrawingAction)
            }
          />
        </Column>
      </Row>
    </Container>
  );
}

export default App;
