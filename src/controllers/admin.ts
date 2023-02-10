import { Request, Response } from "express";
import { Order } from "../utils/interfaces/order";
import { Coupon } from "../utils/interfaces/coupon";
import { v4 as uuidv4 } from "uuid";

export const generateCoupon =
  (couponsCache: any, ordersCache: any) => (req: Request, res: Response) => {
    // get total number of orders
    const orders = ordersCache.keys();
    if (orders.length === 0) {
      res.status(404).end();
    }
    // only generate discount for every 3rd order
    if ((orders.length + 1) % 3 !== 0) {
      return res.status(400).json({
        message: `Coupon can only be generated for every 3rd order.`,
      });
    }
    const coupon: Coupon = {
      code: uuidv4(), // create unique coupon code
      discountPercentage: 10, //  fixed 10 percent discount percentage
    };
    couponsCache.set(coupon.code, coupon); // add coupon to cache
    res.status(201).json({
      coupon: coupon,
    });
  };

export const getOrdersStatistics =
  (ordersCache: any, couponsCache: any) => (req: Request, res: Response) => {
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalDiscount = 0;
    let discountCodes = [];
    // calculate total order,revenue and discount
    ordersCache.keys().forEach((key: string) => {
      const order: Order = ordersCache.get(key);
      totalOrders += 1; // increment order count for each order
      totalRevenue += order.totalPrice; // add order revenue to total revenue
      // check for discount in order
      if (order.discount) {
        totalDiscount += order.discount;
      }
    });

    // get all coupons
    couponsCache.keys().forEach((key: string) => {
      const coupon = couponsCache.get(key);
      discountCodes.push(coupon.code);
    });

    // send order statistics
    res.status(200).json({
      totalRevenue: totalRevenue,
      totalOrders: totalOrders,
      totalDiscount: totalDiscount,
      discountCodes: discountCodes || [],
    });
  };
