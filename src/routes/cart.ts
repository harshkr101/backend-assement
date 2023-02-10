import express from "express";
import {
  getCart,
  createCart,
  checkoutCart,
  addItemToCart,
} from "../controllers/cart";
import { cartsCache, ordersCache, couponsCache } from "../utils/cache";

const router = express.Router();

router.post("/cart", createCart(cartsCache));
router.get("/cart/:id", getCart(cartsCache));
router.post("/cart/:id/item", addItemToCart(cartsCache));
router.post(
  "/cart/:id/checkout",
  checkoutCart(cartsCache, couponsCache, ordersCache)
);

export default router;
