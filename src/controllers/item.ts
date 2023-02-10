import { Request, Response } from "express";
import { Item } from "../utils/interfaces/item";
import { v4 as uuidv4 } from "uuid";

export const createItem =
  (itemCache: any) => async (req: Request, res: Response) => {
    const item = req.body.item;
    // set item in cache
    const itemId = uuidv4();
    itemCache.set(itemId, { id: itemId, ...item });
    res.status(201).json({
      message: "Item created successfully",
      id: itemId,
    });
  };

export const readItem =
  (itemCache: any) => async (req: Request, res: Response) => {
    const item: Item = itemCache.get(req.params.id);
    if (!item) {
      res.status(404).send("Item not found");
      return;
    }
    res.status(200).json({ item: item });
  };

export const updateItem =
  (itemCache: any) => async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const item: Item = itemCache.get(id); // get item from cache
    if (!item) {
      res.status(404).send("Item not found");
      return;
    }
    // update item in cache
    itemCache.set(item.id, { ...item, ...req.body });
    const updatedItem: Item = itemCache.get(item.id);
    res.status(200).json({ item: updatedItem });
  };

export const deleteItem =
  (itemCache: any) => async (req: Request, res: Response) => {
    const item = itemCache.get(req.params.id); // get item from cache
    if (!item) {
      res.status(404).send("Item not found");
      return;
    }
    // delete item in cache
    itemCache.del(item.id);
    res.status(200).json({ message: "Item deleted successfully" });
  };

export const readAllItems =
  (itemCache: any) => async (req: Request, res: Response) => {
    const items = itemCache.keys(); // read all items in cache
    if (!items) {
      res.status(404).send("Item cache is empty");
      return;
    }
    res.status(200).json({ items: items });
  };
