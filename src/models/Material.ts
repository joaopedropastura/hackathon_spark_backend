import { Inventory } from "./Inventory";

export interface Material {
  id: number;
  name: string;

  inventory?: Inventory[];
}
