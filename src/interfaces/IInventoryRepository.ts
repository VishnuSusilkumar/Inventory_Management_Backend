import { IInventoryItem } from "../types/inventory.types";

export interface IInventoryRepository {
  create(item: IInventoryItem): Promise<IInventoryItem>;
  findAll(): Promise<IInventoryItem[]>;
  findById(id: string): Promise<IInventoryItem | null>;
  update(
    id: string,
    item: Partial<IInventoryItem>
  ): Promise<IInventoryItem | null>;
  delete(id: string): Promise<IInventoryItem | null>;
}
