import React from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../store/ToolStore";

const ControlPanel: React.FC = observer(() => {
  const tools = ["brush", "fill", "shape"] as const;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {tools.map((tool) => (
          <button
            key={tool}
            onClick={() => toolStore.setTool(tool)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: toolStore.selectedTool === tool ? "#ccc" : "#fff",
              border: "1px solid #aaa",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {tool.charAt(0).toUpperCase() + tool.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <label>
          Color:{" "}
          <input
            type="color"
            value={toolStore.selectedColor}
            onChange={(e) => toolStore.setColor(e.target.value)}
          />
        </label>

        {toolStore.selectedTool === "shape" && (
          <label>
            Shape:{" "}
            <select
              value={toolStore.shape}
              onChange={(e) => toolStore.setShape(e.target.value as "circle" | "rectangle")}
            >
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
