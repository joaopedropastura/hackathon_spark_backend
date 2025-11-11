import { Material } from "./Material";
import { Location } from "./Location";

export interface Inventory {
  id: number;
  quantity: number;
  locationId: number;
  materialId: number;
  isActive: boolean;

  location?: Location;
  material?: Material;
}
