import React, { useRef, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import toolStore from "../store/ToolStore";

const CanvasBrushTool: React.FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 5;
        ctx.strokeStyle = toolStore.selectedColor;
        ctx.fillStyle = toolStore.selectedColor;
        setContext(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = toolStore.selectedColor;
      context.fillStyle = toolStore.selectedColor;
    }
  }, [context]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);

    if (!context) return;

    if (toolStore.selectedTool === "fill") {
      context.fillStyle = toolStore.selectedColor;
      context.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }

    if (toolStore.selectedTool === "brush") {
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }

    if (toolStore.selectedTool === "shape") {
      context.fillStyle = toolStore.selectedColor;

      if (toolStore.shape === "circle") {
        context.beginPath();
        context.arc(x, y, 30, 0, Math.PI * 2);
        context.fill();
      } else if (toolStore.shape === "rectangle") {
        context.fillRect(x - 30, y - 20, 60, 40);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || toolStore.selectedTool !== "brush" || !context) return;
    const { x, y } = getMousePos(e);
    context.lineTo(x, y);
    context.stroke();
  };

  const handleMouseUp = () => {
    if (toolStore.selectedTool === "brush") {
      setIsDrawing(false);
      context?.closePath();
    }
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
