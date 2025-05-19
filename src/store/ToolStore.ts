import { makeObservable, observable, action } from "mobx";

type LayerTuple = [String, HTMLCanvasElement]

class ToolStore {
  selectedTool: "brush" | "fill" | "shape" = "brush";
  selectedColor: string = "#000000";
  brushSize: 5 | 10 | 15 = 5;
  shape: "circle" | "rectangle" | "triangle" = "circle";
  layers: LayerTuple[] = [];

  constructor() {
    makeObservable(this, {
      selectedTool: observable,
      selectedColor: observable,
      brushSize: observable,
      shape: observable,
      layers: observable,
      setTool: action,
      setColor: action,
      setBrushSize: action,
      setShape: action,
      addLayer: action,
      removeLayer:action
    });
  }

  setTool(tool: "brush" | "fill" | "shape") {
    this.selectedTool = tool;
  }

  setColor(color: string) {
    this.selectedColor = color;
  }

  setBrushSize(size: 5 | 10 | 15) {
    this.brushSize = size;
  }

  setShape(shape: "circle" | "rectangle" | "triangle") {
    this.shape = shape;
  }

  addLayer(name: String, canvas: HTMLCanvasElement) {
    this.layers.push([name, canvas]);
  }

  removeLayer(index: number) {
    const layer = this.layers[index][1];
    if (layer && layer.parentElement) {
      layer.parentElement.removeChild(layer);
    }
    this.layers.splice(index, 1);
  }

  clearLayers() {
    this.layers.forEach(layer => {
      if (layer[1].parentElement) {
        layer[1].parentElement.removeChild(layer[1]);
      }
    });
    this.layers = [];
  }

    toString(): string {
    let str = `Tool: ${toolStore.selectedTool}, \n`;
    if (toolStore.selectedTool === "brush") {
      const sizeLabel = toolStore.brushSize === 5 ? "thin" : toolStore.brushSize === 10 ? "regular" : "thick";
      str += `Size: ${sizeLabel}, \n`;
    }
    if (toolStore.selectedTool === "shape") {
      str += `Shape: ${toolStore.shape}, \n`;
    }
    str += `Color: ${toolStore.selectedColor} \n`;
    return str;
  };
}

const toolStore = new ToolStore();
export default toolStore;
