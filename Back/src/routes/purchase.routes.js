import { Router } from "express";
import { createPurchase } from "../services/purchase.service.js";

const router = Router();

router.post("/purchase", createPurchase);

export default router;