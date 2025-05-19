import React from "react";
import ControlPanel from "./components/ControlPanel";
import CanvasBrushTool from "./components/CanvasBrushTool";
import LayersPanel from "./components/LayersPanel";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h1>Canvas App</h1>
      <ControlPanel />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "2rem" }}>
        <CanvasBrushTool />
        <LayersPanel />
      </div>
    </div>
  );
};

export default App;
