import express from "express";
import { couponsCache, ordersCache } from "../utils/cache";
import { generateCoupon, getOrdersStatistics } from "../controllers/admin";

const router = express.Router();

router.post("/coupon", generateCoupon(couponsCache, ordersCache));
router.get(
  "/orders/statistics",
  getOrdersStatistics(ordersCache, couponsCache)
);

export default router;
