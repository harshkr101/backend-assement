import express from "express";
import { couponsCache } from "../utils/cache";
import { generateCoupon, getOrdersStatistics } from "../controllers/admin";

const router = express.Router();

router.post("/coupon", generateCoupon(couponsCache));
router.get("/orders/statistics", getOrdersStatistics(couponsCache));

export default router;
