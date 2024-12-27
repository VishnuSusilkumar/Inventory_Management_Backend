import { IInventoryItem } from "../types/inventory.types";
import { InventoryRepository } from "../repositories/inventory.repository";
import { ValidationError } from "../utils/error";

export class InventoryService {
  private repository: InventoryRepository;

  constructor() {
    this.repository = new InventoryRepository();
  }

  async createItem(item: IInventoryItem): Promise<IInventoryItem> {
    this.validateItem(item);
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
}
