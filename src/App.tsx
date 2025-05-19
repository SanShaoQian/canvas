import React from "react";
import CanvasBrushTool from "./components/CanvasBrushTool";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Canvas</h1>
      <CanvasBrushTool />
    </div>
  );
};

export default App;
