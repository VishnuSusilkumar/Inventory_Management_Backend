import { IInventoryItem } from "../types/inventory.types";
import { InventoryModel } from "../models/inventory.model";

export class InventoryRepository {
  async create(item: IInventoryItem): Promise<IInventoryItem> {
    return await InventoryModel.create(item);
  }
}
