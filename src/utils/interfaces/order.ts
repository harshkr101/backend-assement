import { Item } from "./item";

export interface Order {
  id: string;
  cartId: string;
  items: Item[];
  discount: number;
  totalPrice: number;
  timestamp: number;
}
