import { IInventoryItem } from "../types/inventory.types";
import { InventoryModel } from "../models/inventory.model";
import { IInventoryRepository } from "../interfaces/IInventoryRepository";

export class InventoryRepository implements IInventoryRepository {
  async create(item: IInventoryItem): Promise<IInventoryItem> {
    return await InventoryModel.create(item);
  }

  async findAll(): Promise<IInventoryItem[]> {
    return await InventoryModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IInventoryItem | null> {
    return await InventoryModel.findById(id);
  }

  async findByName(itemName: string): Promise<IInventoryItem | null> {
    const regex = new RegExp(`^${itemName}$`, "i");
    return await InventoryModel.findOne({ itemName: { $regex: regex } });
  }

  async update(
    id: string,
    item: Partial<IInventoryItem>
  ): Promise<IInventoryItem | null> {
    return await InventoryModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<IInventoryItem | null> {
    return await InventoryModel.findByIdAndDelete(id);
  }
}
