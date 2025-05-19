import React from "react";
import ControlPanel from "./components/ControlPanel";
import CanvasBrushTool from "./components/CanvasBrushTool";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h1>Canvas App</h1>
      <ControlPanel />
      <CanvasBrushTool />
    </div>
  );
};

export default App;
