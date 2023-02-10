import NodeCache from "node-cache";
// use NodeCache as a in-memory store
export const cartsCache = new NodeCache();
export const couponsCache = new NodeCache();
export const ordersCache = new NodeCache();
export const itemCache = new NodeCache();
