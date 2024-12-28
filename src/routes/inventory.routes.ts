import express from "express";
import { InventoryController } from "../controllers/inventory.controller";

const router = express.Router();
const controller = new InventoryController();

router.post("/", controller.createItem);
router.get("/", controller.getAllItems);

export default router;
