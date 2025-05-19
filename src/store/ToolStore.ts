import { makeObservable, observable, action } from "mobx";

class ToolStore {
  selectedTool: "brush" | "fill" | "shape" = "brush";
  selectedColor: string = "#000000";
  shape: "circle" | "rectangle" | "triangle" = "circle";
  layers: HTMLCanvasElement[] = [];

  constructor() {
    makeObservable(this, {
      selectedTool: observable,
      selectedColor: observable,
      shape: observable,
      layers: observable,
      setTool: action,
      setColor: action,
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

  setShape(shape: "circle" | "rectangle" | "triangle") {
    this.shape = shape;
  }

  addLayer(canvas: HTMLCanvasElement) {
    this.layers.push(canvas);
  }

  removeLayer(index: number) {
    const layer = this.layers[index];
    if (layer && layer.parentElement) {
      layer.parentElement.removeChild(layer);
    }
    this.layers.splice(index, 1);
  }

  clearLayers() {
    this.layers.forEach(layer => {
      if (layer.parentElement) {
        layer.parentElement.removeChild(layer);
      }
    });
    this.layers = [];
  }
}

const toolStore = new ToolStore();
export default toolStore;
