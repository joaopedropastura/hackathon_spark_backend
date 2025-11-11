import { Inventory } from "./Inventory";

export interface Location {
  id: number;
  city: string;
  unity: string;
  state: string;
  street: string;
  country: string;

  inventory?: Inventory[];
}
