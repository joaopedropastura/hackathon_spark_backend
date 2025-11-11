import { Inventory } from "./Inventory";

export interface Material {
  id: number;
  name: string;
  isActive: boolean;

  inventory?: Inventory[];
}
