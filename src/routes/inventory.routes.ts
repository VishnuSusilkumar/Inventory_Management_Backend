import express from "express";
import { InventoryController } from "../controllers/inventory.controller";
import { InventoryRepository } from "../repositories/inventory.repository";
import { InventoryService } from "../services/inventory.service";

const router = express.Router();

const repository = new InventoryRepository();
const service = new InventoryService(repository);
const controller = new InventoryController(service);

router.post("/", controller.createItem);
router.get("/", controller.getAllItems);
router.get("/:id", controller.getItemById);
router.put("/:id", controller.updateItem);
router.delete("/:id", controller.deleteItem);

export default router;
