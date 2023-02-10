import { Item } from "./item";

export interface Order {
  id: string;
  cartId: string;
  items: Item[];
  discountCode: string;
  total: number;
  timestamp: number;
}
