import { Request, Response } from "express";
import { InventoryService } from "../services/inventory.service";
import { InventoryRepository } from "../repositories/inventory.repository";
import { asyncHandler } from "../utils/asyncHandler";

export class InventoryController {
  private service: InventoryService;

  constructor() {
    const repository = new InventoryRepository();
    this.service = new InventoryService(repository);
  }

  createItem = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.service.createItem(req.body);
    res.status(201).json({
      success: true,
      data: item,
    });
  });

  getAllItems = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.service.getAllItems();
    res.status(200).json({
      success: true,
      data: items,
    });
  });

  getItemById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await this.service.getItemById(id);
    res.status(200).json({
      success: true,
      data: item,
    });
  });

  updateItem = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.service.updateItem(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: item,
    });
  });

  deleteItem = asyncHandler(async (req: Request, res: Response) => {
    await this.service.deleteItem(req.params.id);
    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  });
}
