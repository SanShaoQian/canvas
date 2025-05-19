import React, { useRef, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../store/ToolStore";

const CanvasBrushTool: React.FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
      }
    }
  }, []);

  const getContext = (): CanvasRenderingContext2D | null => {
    return canvasRef.current?.getContext("2d") ?? null;
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = getContext();
    if (!ctx) return;

    const { x, y } = getMousePos(e);

    ctx.strokeStyle = toolStore.selectedColor;
    ctx.fillStyle = toolStore.selectedColor;

    if (toolStore.selectedTool === "fill") {
      ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }

    if (toolStore.selectedTool === "brush") {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }

    if (toolStore.selectedTool === "shape") {
      if (toolStore.shape === "circle") {
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
      } else if (toolStore.shape === "rectangle") {
        ctx.fillRect(x - 30, y - 20, 60, 40);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || toolStore.selectedTool !== "brush") return;

    const ctx = getContext();
    if (!ctx) return;

    const { x, y } = getMousePos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    const ctx = getContext();
    if (toolStore.selectedTool === "brush" && ctx) {
      ctx.closePath();
    }

    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "2px solid #ccc", backgroundColor: "#fff" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
});

export default CanvasBrushTool;
