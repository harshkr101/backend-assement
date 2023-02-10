import { Request, Response } from "express";
import { Order } from "../utils/interfaces/order";
import { Coupon } from "../utils/interfaces/coupon";
import { uuid } from "uuidv4";

export const generateCoupon =
  (couponsCache: any) => (req: Request, res: Response) => {
    const discountPercentage = req.body.discount;
    const coupon: Coupon = {
      code: uuid(), // create unique coupon code
      discountPercentage: discountPercentage, //  discount percentage
    };
    couponsCache.set(coupon.code, coupon); // add coupon to cache
    return coupon;
  };

export const getOrdersStatistics =
  (ordersCache: any) => (req: Request, res: Response) => {
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalDiscount = 0;

    // calculate total order,revenue and discount
    ordersCache.forEach((order: Order) => {
      totalOrders += 1; // increment order count for each order
      totalRevenue += order.totalPrice; // add order revenue to total revenue
      // check for discount in order
      if (order.discount) {
        totalDiscount += order.discount;
      }
    });
    // send order statistics
    res.status(200).json({
      totalRevenue: totalRevenue,
      totalOrders: totalOrders,
      totalDiscount: totalDiscount,
    });
  };