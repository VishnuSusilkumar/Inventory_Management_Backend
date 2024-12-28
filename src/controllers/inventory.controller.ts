import { Request, Response } from "express";
import { InventoryService } from "../services/inventory.service";
import { asyncHandler } from "../utils/asyncHandler";

export class InventoryController {
  private service: InventoryService;

  constructor() {
    this.service = new InventoryService();
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
}