import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../store/ToolStore";

const CanvasBrushTool: React.FC = observer(() => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const createLayer = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none"; 
    canvas.style.zIndex = (toolStore.layers.length + 1).toString();
    toolStore.addLayer(toolStore.toString(), canvas);
    containerRef.current?.appendChild(canvas);
    return canvas;
  };

  const getMousePos = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = createLayer();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = toolStore.brushSize;
    ctx.strokeStyle = toolStore.selectedColor;
    ctx.fillStyle = toolStore.selectedColor;

    const { x, y } = getMousePos(e);

    if (toolStore.selectedTool === "fill") {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (toolStore.selectedTool === "shape") {
      if (toolStore.shape === "circle") {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
      } else if (toolStore.shape === "rectangle") {
        ctx.fillRect(x - 30, y - 20, 60, 40);
      } else if (toolStore.shape === "triangle") {
        ctx.beginPath();
        ctx.moveTo(x, y - 20);
        ctx.lineTo(x - 20, y + 20);
        ctx.lineTo(x + 20, y + 20);
        ctx.closePath();
        ctx.fill();
      }
    }

    if (toolStore.selectedTool === "brush") {
      ctx.beginPath();
      ctx.moveTo(x, y);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const { left, top } = canvas.getBoundingClientRect();
        const mx = moveEvent.clientX - left;
        const my = moveEvent.clientY - top;
        ctx.lineTo(mx, my);
        ctx.stroke();
      };

      const handleMouseUp = () => {
        ctx.closePath();
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  };

  useEffect(() => {
    containerRef.current!.innerHTML = "";
    toolStore.clearLayers();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "relative",
          width: 800,
          height: 600,
          border: "2px solid #ccc",
          backgroundColor: "#fff",
          userSelect: "none",
        }}
      />
    </div>
  );
});

export default CanvasBrushTool;
