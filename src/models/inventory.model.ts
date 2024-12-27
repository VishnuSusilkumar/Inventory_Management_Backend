import mongoose, { Schema } from "mongoose";
import { IInventoryItem } from "../types/inventory.types";

const inventorySchema = new Schema<IInventoryItem>(
  {
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const InventoryModel = mongoose.model<IInventoryItem>(
  "Item",
  inventorySchema
);
