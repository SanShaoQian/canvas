import React from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../store/ToolStore";

const ControlPanel: React.FC = observer(() => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => toolStore.setTool("brush")} style={{ backgroundColor: toolStore.selectedTool === "brush" ? "#ccc" : "#fff" }}>🖌 Brush</button>
        <button onClick={() => toolStore.setTool("fill")} style={{ backgroundColor: toolStore.selectedTool === "fill" ? "#ccc" : "#fff" }}>🎨 Fill</button>
        <button onClick={() => toolStore.setTool("shape")} style={{ backgroundColor: toolStore.selectedTool === "shape" ? "#ccc" : "#fff" }}>🔺 Shape</button>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <label>
          Color:
          <input type="color" value={toolStore.selectedColor} onChange={(e) => toolStore.setColor(e.target.value)} />
        </label>

        {toolStore.selectedTool === "shape" && (
          <label>
            Shape:
            <select value={toolStore.shape} onChange={(e) => toolStore.setShape(e.target.value as any)}>
              <option value="circle">Circle</option>
              <option value="rectangle">Rectangle</option>
            </select>
          </label>
        )}
      </div>
    </div>
  );
});

export default ControlPanel;
