import { IInventoryItem } from "../types/inventory.types";
import { IInventoryService } from "../interfaces/IInventoryService";
import { ValidationError, NotFoundError } from "../utils/error";
import { IInventoryRepository } from "../interfaces/IInventoryRepository";

export class InventoryService implements IInventoryService {
  private repository: IInventoryRepository;

  constructor(repository: IInventoryRepository) {
    this.repository = repository;
  }

  async createItem(item: IInventoryItem): Promise<IInventoryItem> {
    this.validateItem(item);
    const existingItem = await this.repository.findByName(item.itemName);
    if (existingItem) {
      throw new ValidationError("An item with the same name already exists");
    }
    return await this.repository.create(item);
  }

  private validateItem(item: IInventoryItem): void {
    if (!item.itemName || item.itemName.trim().length === 0) {
      throw new ValidationError("Item name is required");
    }
    if (item.quantity < 0) {
      throw new ValidationError("Quantity cannot be negative");
    }
    if (item.price < 0) {
      throw new ValidationError("Price cannot be negative");
    }
    if (!item.category) {
      throw new ValidationError("Category is required");
    }
  }

  async getAllItems(): Promise<IInventoryItem[]> {
    return await this.repository.findAll();
  }

  async getItemById(id: string): Promise<IInventoryItem> {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new NotFoundError("Item not found");
    }
    return item;
  }

  async updateItem(
    id: string,
    item: Partial<IInventoryItem>
  ): Promise<IInventoryItem> {
    if (item.itemName) {
      const existingItem = await this.repository.findByName(item.itemName);

      if (existingItem && existingItem._id?.toString() !== id) {
        throw new ValidationError("An item with the same name already exists");
      }
    }
    const updatedItem = await this.repository.update(id, item);
    if (!updatedItem) throw new NotFoundError("Item not found");
    return updatedItem;
  }

  async deleteItem(id: string): Promise<void> {
    const deletedItem = await this.repository.delete(id);
    if (!deletedItem) throw new NotFoundError("Item not found");
  }
}
