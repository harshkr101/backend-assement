import { Request, Response, NextFunction } from "express";
import { Item } from "../utils/interfaces/item";
import { Cart } from "../utils/interfaces/cart";
import { uuid } from "uuidv4";

// create a new cart and return its Id
export const createCart =
  (cartsCache: any) => (req: Request, res: Response, next: NextFunction) => {
    const cartId = uuid(); /// create a cart Id
    cartsCache.set(cartId, { items: [] }); // creates a new cart
    res.status(201).json({ cartId });
  };

// add Items to a cart with specific Id
export const addItemToCart =
  (cartsCache: any) => (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params; // get cart id
    const { id, name, price, quantity } = req.body as Item; // get item details
    const cart = (cartsCache.get(cartId) as Cart) || { items: [] }; //get cart
    cart.items.push({ id, name, price, quantity }); // add items to cart
    cartsCache.set(cartId, cart); // update cart
    res.status(201).json({ message: "Item added to cart successfully." });
  };

// retrieves item in a cart using its Id
export const getCart =
  (cartsCache: any) => (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params;

    const cart = cartsCache.get(cartId) as Cart; // get cart from cache
    if (!cart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }
    res.status(200).json({ cart: cart });
  };

// checkout items in the cart
export const checkoutCart =
  (cartsCache: any, couponsCache: any, ordersCache: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.params;
    const { discountCode } = req.body;

    const cart = cartsCache.get(cartId) as Cart; //get cart from cache
    if (!cart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }

    let discountPercentage = 0;
    if (discountCode) {
      const coupon = couponsCache.get(discountCode); // get coupon from cache
      if (!coupon) {
        res.status(400).json({ message: "Invalid discount code." });
        return;
      }
      discountPercentage = coupon.discountPercentage; // get discount percentage from coupon
    }

    // calculate total price of the cart
    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discount = (totalPrice * discountPercentage) / 100; // calculate discount price
    // creates final order for items
    const order = {
      id: uuid(),
      cartId,
      discount,
      totalPrice: totalPrice - discount,
      items: cart.items,
    };
    ordersCache.set(order.id, order); // set order in cache
    cartsCache.delete(cartId); //deletes cart once checkout is completed

    res.json({ message: "Order placed successfully.", order });
  };
