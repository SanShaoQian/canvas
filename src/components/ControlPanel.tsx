import React from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../store/ToolStore";

const ControlPanel: React.FC = observer(() => {
  const tools = ["brush", "fill", "shape"] as const;

  const handleDeleteLast = () => {
    if (toolStore.layers.length > 0) {
      toolStore.removeLayer(toolStore.layers.length - 1);
    }
  };

  const handleClearAll = () => {
    toolStore.clearLayers();
  };

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
              onChange={(e) => toolStore.setShape(e.target.value as "circle" | "rectangle" | "triangle")}
            >
              <option value="circle">Circle</option>
              <option value="rectangle">Rectangle</option>
              <option value="triangle">Triangle</option>
            </select>
          </label>
        )}

        {toolStore.selectedTool === "brush" && (
          <label>
            Size: {" "}
            <select
              value={toolStore.brushSize}
              onChange={(e) =>
                toolStore.setBrushSize(Number(e.target.value) as 5 | 10 | 15)
              }
            >
                <option value={5}>Thin</option>
                <option value={10}>Regular</option>
                <option value={15}>Thick</option>
            </select>
          </label>
        )}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={handleDeleteLast}
          disabled={toolStore.layers.length === 0}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #aaa",
            backgroundColor: "#ffecec",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete Last Layer
        </button>

        <button
          onClick={handleClearAll}
          disabled={toolStore.layers.length === 0}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #aaa",
            backgroundColor: "#ffeecc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear All Layers
        </button>
      </div>
    </div>
  );
});

export default ControlPanel;
