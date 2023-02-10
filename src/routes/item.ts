import express from "express";
import {
  readItem,
  createItem,
  deleteItem,
  updateItem,
  readAllItems,
} from "../controllers/item";
import { itemCache } from "../utils/cache";

const router = express.Router();

router.post("/item", createItem(itemCache));

router
  .route("/item/:id")
  .get(readItem(itemCache))
  .put(updateItem(itemCache))
  .delete(deleteItem(itemCache));

router.get("/items", readAllItems(itemCache));

export default router;
