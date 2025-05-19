import { makeAutoObservable } from "mobx";

export type Tool = "brush" | "fill" | "shape";
export type Shape = "rectangle" | "circle";

class ToolStore {
  selectedTool: Tool = "brush";
  selectedColor: string = "#000000";
  shape: Shape = "circle";

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  setColor(color: string) {
    this.selectedColor = color;
  }

  setShape(shape: Shape) {
    this.shape = shape;
  }
}

const toolStore = new ToolStore();
export default toolStore;
